import fastify, { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'

import { usuarioComumService } from '../service/UsuarioComumService'

export async function UsuarioRoutes(app: FastifyInstance) {
    app.get('/projetos', async () => {
        return await usuarioComumService.visualizarProjetos()
    })

    app.post('/usuario', async (request, reply) => {
        try {

            const { numero_cpf, senha, nome, tipo } = request.body as { numero_cpf: string; senha: string; nome: string; tipo: string };

            const usuarioCriado = await usuarioComumService.cadastrar(numero_cpf, senha, nome, tipo);

            // Retorna o usuário criado sem a senha
            return reply.status(201).send(usuarioCriado);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Se a validação falhar, retorna os erros de validação
                return reply.status(400).send({ errors: error.errors });
            }

            // Erro interno ou erro do serviço
            console.error(error);
            return reply.status(500).send({ error: 'Erro ao cadastrar usuário.', details: error.message });
        }
    })

    app.post('/usuario/login', async (request, reply) => {
        // Validando os dados da requisição com zod
        const bodySchema = z.object({
            numero_cpf: z.string(),
            senha: z.string(),
        });

        const { numero_cpf, senha } = bodySchema.parse(request.body);

        if (!numero_cpf || !senha) {
            return reply.status(400).send({ error: 'CPF e senha são obrigatórios.' });
        }

        try {
            // Chamando o método de login do serviço
            const { token, usuario } = await usuarioComumService.login(numero_cpf, senha);

            // Retornando o token e os dados do usuário
            return { token, usuario };
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao realizar o login', details: error.message });
        }
    });
}
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { usuarioComumService } from "../service/UsuarioComumService";


export async function DepartamentoRoutes(app: FastifyInstance) {
    // departamento criar um usuario
    app.post("/usuario", async (request, reply) => {
        try {
            const {
                numero_cpf,
                senha,
                nome,
                tipo,
                descricao_pessoal,
                departamentoCurso,
                curso,
            } = request.body as {
                numero_cpf: string;
                senha: string;
                nome: string;
                tipo: number;
                descricao_pessoal: string;
                departamentoCurso: string;
                curso: string
            };

            const usuarioCriado = await usuarioComumService.cadastrar(
                numero_cpf,
                senha,
                nome,
                tipo,
                descricao_pessoal,
                departamentoCurso,
                curso
            );

            return reply.status(201).send(usuarioCriado);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send({ errors: error.errors });
            }

            console.error(error);
            return reply
                .status(500)
                .send({ error: "Erro ao cadastrar usuário.", details: error.message });
        }
    });

    // departamento editar um usuario
    app.put("/usuario/:numeroCPF", async (request, reply) => {
        const bodySchema = z.object({
            numero_cpf: z.string().optional(),
            senha: z.string().optional(),
            nome: z.string().optional(),
            tipo: z.coerce.number(),
            descricao_pessoal: z.string().optional(),
            departamentoCurso: z.string().optional(),
            curso: z.string().optional(),
        });

        const {
            numero_cpf,
            senha,
            nome,
            tipo,
            descricao_pessoal,
            departamentoCurso,
            curso,
        } = bodySchema.parse(request.body);

        try {
            const usuarioEditado = await usuarioComumService.editar(
                numero_cpf,
                senha,
                nome,
                tipo,
                descricao_pessoal,
                departamentoCurso,
                curso
            );

            return reply.status(200).send(usuarioEditado);
        } catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    });

    // departamento apagar um projeto
    app.delete('/usuario/:numeroCPF', async (request, reply) => {
        const paramsSchema = z.object({
            numeroCPF: z.string(),
        })
        const { numeroCPF } = paramsSchema.parse(request.params);


        try {
            const usuario = await usuarioComumService.apagarUser(numeroCPF);

            return reply.status(200).send({ message: `Usuário com CPF ${numeroCPF} apagado com sucesso!`, usuario });
        } catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    });




}

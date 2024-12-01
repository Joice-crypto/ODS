import { prisma } from '../lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class UsuarioComumService {

    async visualizarProjetos() {
        return prisma.projeto.findMany({
            orderBy: {
                nome: 'asc',
            },
        })
    }

    async cadastrar(numero_cpf: string, senha: string, nome: string, tipo: string) {

        try {
            const usuarioExistente = await prisma.usuarioComum.findUnique({
                where: { numero_cpf },
            });

            if (usuarioExistente) {
                throw new Error('Usuário com este CPF já existe.');
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const novoUsuario = await prisma.usuarioComum.create({
                data: {
                    numero_cpf,
                    senha: senhaHash,
                    nome,
                    tipo,
                },
            });

            const { senha: _, ...usuarioSemSenha } = novoUsuario;
            return usuarioSemSenha;

        } catch (error) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        }
    }

    async login(numero_cpf: string, senha: string) {
        console.log(numero_cpf, senha)
        try {
            // Verificando se o usuário existe
            const usuario = await prisma.usuarioComum.findUnique({
                where: { numero_cpf },
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            // Comparando a senha
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                throw new Error('Senha inválida.');
            }

            // Removendo a senha do objeto usuário antes de retornar
            const { senha: _, ...usuarioSemSenha } = usuario;

            // Gerando o token JWT
            const token = jwt.sign(
                {
                    name: usuario.nome,
                    tipo: usuario.tipo,
                },
                process.env.JWT_SECRET || 'default_secret', // Chave secreta do JWT
                {
                    subject: usuario.numero_cpf, // 'sub' no JWT
                    expiresIn: '30d',
                }
            );

            return { token, usuario: usuarioSemSenha };

        } catch (error) {
            throw new Error(`Erro ao realizar o login: ${error.message}`);
        }
    }


}

export const usuarioComumService = new UsuarioComumService()

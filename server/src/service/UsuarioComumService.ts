import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuarioComumService {
    async visualizarProjetos() {
        const projetos = prisma.projeto.findMany({
            orderBy: {
                nome: "asc",
            },
        });

        return projetos
    }

    async cadastrar(
        numero_cpf: string,
        senha: string,
        nome: string,
        tipo: number,
        descricao_pessoal: string,
        departamentoCurso: string,
        curso: string
    ) {
        // 0 departamento
        // 1 orientador
        // 2 orientando
        try {
            const usuarioExistente = await prisma.usuarioComum.findUnique({
                where: { numero_cpf },
            });

            if (usuarioExistente) {
                throw new Error("Usuário com este CPF já existe.");
            }

            const senhaHash = await bcrypt.hash(numero_cpf, 10);

            const novoUsuario = await prisma.usuarioComum.create({
                data: {
                    numero_cpf,
                    senha: senhaHash,
                    nome,
                    tipo: Number(tipo),
                },
            });

            console.log("Usuário comum criado com sucesso:", novoUsuario);

            if (Number(tipo) === 1) {
                const novoOrientador = await prisma.orientador.create({
                    data: {
                        numero_cpf: novoUsuario.numero_cpf,
                        descricao_pessoal,
                        departamentoCurso,
                    },
                });

                console.log("Orientador criado com sucesso:", novoOrientador);
            }
            else if (Number(tipo) === 2) {
                const novoOrientando = await prisma.orientando.create({
                    data: {
                        numero_cpf: novoUsuario.numero_cpf,
                        curso
                    },
                });

                console.log("Orientando criado com sucesso:", novoOrientando);

            }

            const { senha: _, ...usuarioSemSenha } = novoUsuario;
            return usuarioSemSenha;
        } catch (error) {
            throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
        }
    }

    async editar(
        numero_cpf: string,
        senha: string,
        nome: string,
        tipo: number,
        descricao_pessoal: string,
        departamentoCurso: string,
        curso: string
    ) {
        try {
            const usuarioExistente = await prisma.usuarioComum.findUnique({
                where: { numero_cpf },
            });

            if (!usuarioExistente) {
                throw new Error("Usuário não encontrado.");
            }
            const senhaHash = await bcrypt.hash(senha, 10);

            const usuarioAtualizado = await prisma.usuarioComum.update({
                where: { numero_cpf },
                data: {
                    senha: senhaHash,
                    nome,
                    tipo: Number(tipo),
                },
            });

            console.log("Usuário comum atualizado com sucesso:", usuarioAtualizado);

            if (tipo === 1) {
                const orientadorAtualizado = await prisma.orientador.update({
                    where: { numero_cpf },
                    data: {
                        descricao_pessoal,
                        departamentoCurso,
                    },
                });

                console.log("Orientador atualizado com sucesso:", orientadorAtualizado);
            } else if (tipo === 2) {
                const orientandoAtualizado = await prisma.orientando.update({
                    where: { numero_cpf },
                    data: {
                        curso
                    },
                });

                console.log("Orientador atualizado com sucesso:", orientandoAtualizado);
            }

            const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
            return usuarioSemSenha;
        } catch (error) {
            throw new Error(`Erro ao editar usuário: ${error.message}`);
        }
    }

    async login(numero_cpf: string, senha: string) {
        console.log(numero_cpf, senha);
        try {
            const usuario = await prisma.usuarioComum.findUnique({
                where: { numero_cpf },
            });

            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                throw new Error("Senha inválida.");
            }

            const { senha: _, ...usuarioSemSenha } = usuario;

            // Gerando o token JWT
            const token = jwt.sign(
                {
                    name: usuario.nome,
                    tipo: usuario.tipo,
                },
                process.env.JWT_SECRET || "default_secret",
                {
                    subject: usuario.numero_cpf,
                    expiresIn: "30d",
                }
            );

            return { token, usuario: usuarioSemSenha };
        } catch (error) {
            throw new Error(`Erro ao realizar o login: ${error.message}`);
        }
    }

    async apagarUser(numero_cpf: string) {
        try {
            const usuario = await prisma.usuarioComum.findUnique({
                where: { numero_cpf },
            });

            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }
            if (usuario.tipo === 1) {
                const orientador = await prisma.orientador.findUnique({
                    where: { numero_cpf },
                });

                if (orientador) {
                    await prisma.orientador.delete({
                        where: { numero_cpf },
                    });
                    console.log(`Orientador ${numero_cpf} apagado.`);
                }
            }

            if (usuario.tipo === 2) {
                const orientando = await prisma.orientando.findUnique({
                    where: { numero_cpf },
                });

                if (orientando) {
                    await prisma.orientando.delete({
                        where: { numero_cpf },
                    });
                    console.log(`Orientando ${numero_cpf} apagado.`);
                }
            }
            await prisma.usuarioComum.delete({
                where: { numero_cpf },
            });

            console.log(`Usuário ${numero_cpf} apagado com sucesso.`);
            return usuario;
        } catch (error) {
            throw new Error(`Erro ao apagar usuário: ${error.message}`);
        }
    }
}

export const usuarioComumService = new UsuarioComumService();

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { request } from "express";

export async function OrientadorRoutes(app: FastifyInstance) {
    // ver um projeto especifico
    app.get("/projeto/:projeto_id", async (request, reply) => {
        const paramsSchema = z.object({
            projeto_id: z.coerce.number(),
        });

        const { projeto_id } = paramsSchema.parse(request.params);
        console.log(projeto_id);

        try {
            const projeto = await prisma.projeto.findUniqueOrThrow({
                where: {
                    id: projeto_id,
                },
                include: {
                    BancaAvaliadora: true,
                    ProjetosOrientando: true,
                    Orientador: {
                        include: {
                            usuarioComum: true,
                        }
                    },

                }
            });

            return projeto;
        } catch (error) {
            console.error("Erro ao buscar projeto:", error);
            return reply.status(404).send({ error: "Projeto não encontrado." });
        }
    });


    // orientador cadastra projeto
    app.post("/projeto", async (request) => {

        // console.log(request.body)
        // cadastrar projeto
        const bodySchema = z.object({
            tipo: z.string(),
            nome: z.string(),
            data_inicio: z.coerce.date(),
            data_termino: z.coerce.date(),
            descricao: z.string(),
            orientador_cpf: z.coerce.string(),
            banca_avaliadora_convidada: z.string(),
            apresentacoes: z.string(),
            banca_local: z.string(),
            banca_data: z.coerce.date(),
            status: z.string(),
        });


        const {
            tipo,
            nome,
            data_inicio,
            data_termino,
            descricao,
            orientador_cpf,
            banca_avaliadora_convidada,
            apresentacoes,
            banca_local,
            banca_data,
            status,
        } = bodySchema.parse(request.body);


        const orientador = await prisma.orientador.findUnique({
            where: { numero_cpf: orientador_cpf },
        });

        if (!orientador) {
            throw new Error("Orientador não encontrado. Certifique-se de que o CPF está correto.");
        }

        const projeto = await prisma.projeto.create({
            data: {
                tipo,
                nome,
                data_inicio,
                data_termino,
                descricao,
                orientador_cpf,
                banca_avaliadora_convidada,
                apresentacoes,
                banca_local,
                banca_data,
                status,
            },
        });
        return projeto;
    });

    // orientador apagar um projeto
    app.delete("/projeto/:id", async (request, reply) => {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        try {
            const { id } = paramsSchema.parse(request.params);

            const projeto = await prisma.projeto.findUnique({
                where: { id },
            });

            if (!projeto) {
                return reply
                    .status(404)
                    .send({ error: `Projeto com ID ${id} não encontrado.` });
            }
            if (projeto.status === "Em andamento") {
                return reply
                    .status(400)
                    .send({ error: "O projeto está em andamento e não pode ser excluído." });
            }
            await prisma.projeto.delete({
                where: { id },
            });

            return reply
                .status(200)
                .send({ message: `Projeto com ID ${id} excluído com sucesso!` });
        } catch (error) {
            console.error(error);
            return reply
                .status(500)
                .send({
                    error: "Erro ao excluir o projeto. Tente novamente mais tarde.",
                });
        }
    });

    // orientador cadastrar aluno em projeto
    app.post("/projeto/orientando", async (request, reply) => {
        const bodySchema = z.object({
            projeto_id: z.coerce.number(),
            orientando_cpf: z.string(),
            data_entrada: z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: "Data de entrada inválida.",
            }),
            data_saida: z
                .string()
                .optional()
                .refine((date) => !date || !isNaN(Date.parse(date)), {
                    message: "Data de saída inválida.",
                }),
            situacao: z.string(),
        });

        try {
            const { projeto_id, orientando_cpf, data_entrada, data_saida, situacao } =
                bodySchema.parse(request.body);

            const projeto = await prisma.projeto.findUnique({
                where: { id: projeto_id },
            });

            if (!projeto) {
                return reply.status(404).send({ error: "Projeto não encontrado." });
            }

            const orientando = await prisma.orientando.findUnique({
                where: { numero_cpf: orientando_cpf },
            });

            if (!orientando) {
                return reply.status(404).send({ error: "Orientando não encontrado." });
            }

            const projetoOrientando = await prisma.projetoOrientando.create({
                data: {
                    projeto_id,
                    orientando_cpf,
                    data_entrada: new Date(data_entrada),
                    data_saida: data_saida ? new Date(data_saida) : null,
                    situacao,
                },
            });

            return reply.status(201).send({
                message: "Orientando cadastrado no projeto com sucesso.",
                projetoOrientando,
            });
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: error.message });
        }
    });

    // orientador remover aluno de um projeto
    app.delete("/projeto/orientando", async (request, reply) => {
        const querySchema = z.object({
            projeto_id: z.coerce.number(),
            orientando_cpf: z.string(),
        });

        try {
            const { projeto_id, orientando_cpf } = querySchema.parse(request.query);
            const projeto = await prisma.projeto.findUnique({
                where: { id: projeto_id },
            });

            if (!projeto) {
                return reply.status(404).send({ error: "Projeto não encontrado." });
            }

            const projetoOrientando = await prisma.projetoOrientando.findUnique({
                where: {
                    projeto_id_orientando_cpf: {
                        projeto_id,
                        orientando_cpf,
                    },
                },
            });

            if (!projetoOrientando) {
                return reply
                    .status(404)
                    .send({ error: "Orientando não está associado a este projeto." });
            }

            await prisma.projetoOrientando.delete({
                where: {
                    projeto_id_orientando_cpf: {
                        projeto_id,
                        orientando_cpf,
                    },
                },
            });

            return reply.status(200).send({
                message: "Orientando removido do projeto com sucesso.",
            });
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: error.message });
        }
    });

    // registrar banca avaliadora
    app.post("/projeto/bancaAvaliadora", async (request, reply) => {
        const bodySchema = z.object({
            projeto_id: z.coerce.number(),
            membro_id: z.string(),
            tipo: z.string(),
            nome: z.string(),
            ies: z.string(),

        });

        try {
            const { projeto_id, membro_id, tipo, nome, ies } = bodySchema.parse(request.body);
            let membroIdFinal = membro_id;
            if (membro_id.toLowerCase() === "sim") {

                const orientador = await prisma.orientador.findFirst({
                    where: {
                        usuarioComum: {
                            nome: nome,
                            tipo: 1,
                        },
                    },
                    include: {
                        usuarioComum: true,
                    },
                });

                if (!orientador) {
                    return reply.status(404).send({ error: "Orientador não encontrado ou não é do tipo correto." });
                }


                membroIdFinal = orientador.numero_cpf;
            }

            const projeto = await prisma.projeto.findUnique({
                where: { id: projeto_id },
            });



            const membroBanca = await prisma.bancaAvaliadora.create({
                data: {
                    projeto_id,
                    membro_id: membroIdFinal,
                    nome,
                    tipo,
                    ies,
                },
            });

            return reply.status(201).send({
                message: "Banca registrada com sucesso.",
                membroBanca,
            });
        } catch (error) {
            // console.error(error);
            return reply.status(400).send({ error: error.message });
        }
    });

}

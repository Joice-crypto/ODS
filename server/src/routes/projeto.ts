import fastify, { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function ProjetoRoutes(app: FastifyInstance) {

    app.post('/projeto', async (request) => {
        // cadastrar projeto
        const bodySchema = z.object({
            tipo: z.string(),
            nome: z.string(),
            data_inicio: z.coerce.date(),
            data_termino: z.coerce.date(),
            descricao: z.string(),
            orientador_cpf: z.string(),
            banca_avaliadora_convidada: z.string(),
            apresentacoes: z.string(),
            banca_local: z.string(),
            banca_data: z.coerce.date(),
            status: z.string(),
        })

        const { tipo, nome, data_inicio, data_termino, descricao, orientador_cpf, banca_avaliadora_convidada,
            apresentacoes,
            banca_local, banca_data, status } = bodySchema.parse(request.body)
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
                status
            },
        })
        return projeto
    })

    app.delete('/projeto/:id', async (request, reply) => {
        // apagar um projeto
        const paramsSchema = z.object({
            id: z.number(),
        })
        const { id } = paramsSchema.parse(request.params)
        const projeto = await prisma.projeto.findUniqueOrThrow({
            where: {
                id,
            },
        })
        await prisma.projeto.delete({
            where: { id },
        })

        return reply.status(200).send({ message: `Projeto com ID ${id} excluído com sucesso!` })

    })
}


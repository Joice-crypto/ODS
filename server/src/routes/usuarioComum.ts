import { FastifyInstance } from "fastify";
import { z } from "zod";
import { usuarioComumService } from "../service/UsuarioComumService";

export async function UsuarioRoutes(app: FastifyInstance) {
    // ver todos os projetos
    app.get("/projetos", async () => {
        return await usuarioComumService.visualizarProjetos();
    });

    // fazer login
    app.post("/usuario/login", async (request, reply) => {
        const bodySchema = z.object({
            numero_cpf: z.string(),
            senha: z.string(),
        });

        const { numero_cpf, senha } = bodySchema.parse(request.body);

        if (!numero_cpf || !senha) {
            return reply.status(400).send({ error: "CPF e senha são obrigatórios." });
        }

        try {
            const { token, usuario } = await usuarioComumService.login(
                numero_cpf,
                senha
            );

            return { token, usuario };
        } catch (error) {
            return reply
                .status(500)
                .send({ error: "Erro ao realizar o login", details: error.message });
        }
    });
}

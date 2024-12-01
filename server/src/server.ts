import fastify from 'fastify'
import cors from '@fastify/cors'
import { ProjetoRoutes } from './routes/projeto'
import { UsuarioRoutes } from './routes/usuarioComum'


// rodar com npm run dev 

const app = fastify()


app.register(cors, {
  origin: true,
})

app.register(UsuarioRoutes)
app.register(ProjetoRoutes)


app.listen({ port: 3300, }).then(() => {
  console.log('Servidor esta rodando')
})
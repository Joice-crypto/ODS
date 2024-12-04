import fastify from 'fastify'
import cors from '@fastify/cors'
import { UsuarioRoutes } from './routes/usuarioComum'
import { DepartamentoRoutes } from './routes/departamento'
import { OrientadorRoutes } from './routes/orientador'


// rodar com npm run dev 

const app = fastify()


app.register(cors, {
  origin: true,
})

app.register(UsuarioRoutes)
app.register(OrientadorRoutes)
app.register(DepartamentoRoutes)


app.listen({ port: 3300, }).then(() => {
  console.log('Servidor esta rodando')
})
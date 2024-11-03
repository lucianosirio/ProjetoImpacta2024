import Fastify from 'fastify';
import cors from '@fastify/cors';
import {routes} from './routes';
import { error } from 'console';
import { request } from 'http';
import { REPL_MODE_SLOPPY } from 'repl';


const app = Fastify ({logger: true}) //para inicializar a aplicação com propriedade para report de log

app.setErrorHandler((error, request, reply) => {

    reply.code(400).send({ message: error.message})

})

//Função criada para inicialização da aplicação
const start = async () => {

    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({ port: 3333})

    }catch(err){
        process.exit(1)
    }
}

start();

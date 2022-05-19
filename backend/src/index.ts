import 'dotenv/config'
import { AppDataSource } from "./data-source"
import { ApolloServer } from 'apollo-server-express'
import express from "express"
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from 'cors';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';
import { WorkerResolver } from './resolvers/workerResolver';
import { CompanyResolver } from './resolvers/companyResolver';

AppDataSource.initialize().then(async () => {

    //create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(cookieParser());
    app.use(cors({
        credentials: true,
        origin: ['http://localhost:3000', 'https://studio.apollographql.com']
    }));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
               UserResolver,
               WorkerResolver, 
               CompanyResolver
            ]
        }),
        context: ({req, res}) => ({req, res}),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    // start express server
    app.listen(process.env.BACKEND_PORT, ()=>{
        console.log(`Listening on port: ${process.env.BACKEND_PORT}`)
    });

})
.catch(error => {
    console.log(error);
})

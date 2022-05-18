import 'dotenv/config'
import { AppDataSource } from "./data-source"
import { ApolloServer } from 'apollo-server-express'
// import { buildSchema } from "type-graphql";
import express from "express"
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from 'cors';

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
        // schema: await buildSchema({
        //     resolvers: [
                
        //     ]
        // }),
        context: ({req, res}) => ({req, res}),
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    // start express server
    app.listen(process.env.BACKEND_PORT, ()=>{
        console.log(`Listening on port: ${process.env.BACKEND_PORT}`)
    });


    // const app = express();
    // const httpServer = https.createServer({
    //     key: fs.readFileSync(path.resolve(__dirname, "ssl/dev/rootCA-key.pem")), // ssl/dev/wfm-backend-key.pem
    //     cert: fs.readFileSync(path.resolve(__dirname, "ssl/dev/rootCA.pem")) // 
    // },
    // app);
    // const server = new ApolloServer({
    //     schema: await buildSchema({
    //         resolvers: [
    //             UserResolver
    //         ]
    //     }),
    //     context: ({req, res}) => ({req, res}),
    //     plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    // });
    // await server.start();
    // server.applyMiddleware({ app });
    // await new Promise<void>(resolve => httpServer.listen({ port: 3001 }, resolve));
    // console.log(`🚀 Server ready at https://localhost:3001${server.graphqlPath}`);

})
.catch(error => {
    console.log(error);
})

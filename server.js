const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const SERVER_PORT = 4000;

const app = express();
app.use(cors());

// Setting  up MongoDB
const DB_CONNECTION_STRING = 'mongodb+srv://dbrootadmin:dbpassword@cluster0.o0ag19w.mongodb.net/db_w2024_comp3133?retryWrites=true&w=majority';

async function startServer(){
    try{
        mongoose.connect(DB_CONNECTION_STRING, {
        }).then(success => {
            console.log(`MongoDB succesfully connected`);
        }).catch(err => {
            console.log(`Error while MongoDB connection ${err}`);
        });
        
        // Apollo Sever
        const server = new ApolloServer({
            typeDefs,
            resolvers
        });
        
        await server.start();
        server.applyMiddleware({ app });
        
        app.listen(SERVER_PORT, () => 
        console.log(`Express GraphQL Server Now Running On http://localhost:${SERVER_PORT}/graphql`));
    }catch (err) {
        console.log(err)
    }
}

startServer()
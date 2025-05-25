import * as express from 'express';
import { Router } from 'express';
import * as cors from "cors";
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolver';
import { typeDefs } from './typeDefs';

interface Options{
    port?: number;
}

export class ServerGraphQL {

  private app: ApolloServer;
  private readonly port: number;

  constructor(options:Options){
    const {port = 3100 } = options;
    this.port = port;
  }

  // metodo para agergar las propiades al server (app) y correrlo
  async start() {

    this.app = new ApolloServer({
      typeDefs,
      resolvers,
      cors: {
            origin: '*',
            credentials: true
        }
    });

    this.app.listen({ port: this.port }).then(({ url }) => {
      console.log(`Apolo Server listo ${url}`);
    });
  }
}
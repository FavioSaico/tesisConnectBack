import express from 'express';
import { Router } from 'express';
import cors from "cors";

interface Options{
    port?: number;
    routes:Router;
}

export class Server {

    public readonly app = express();

    private readonly port: number; // propiedad del puerto
    private readonly routes: Router;

    constructor(options:Options){
        // destructuramos, por defecto el valor será 3100
        const {port = 3100, routes } = options;
        this.port = port; // establecemos el puerto
        this.routes = routes; // inicializamos la rutas
    }

    // metodo para agergar las propiades al server (app) y correrlo
    async start(){
        // Middlewares: son funcion es que se ejecutan antes de otras funciones
        this.app.use(express.json()) // serializamos la data como JSON, para peticion tipo raw
        this.app.use(express.urlencoded({extended:true})) // serializamos la data como JSON, para peticiones en x-www-form-urlencoded

        // CORS
        // const  whitelist = ['*', 'http://localhost:3000']
        // const  corsOptions = {
        //     origin: function (origin, callback) {
        //         if (whitelist.indexOf(origin) !== -1) {
        //             callback(null, true)
        //         } else {
        //             callback(new Error('Not allowed by CORS'))
        //         }
        //     }
        // }
        this.app.use(cors())

        

        // agreamos las rutas al server
        this.app.use(this.routes)

        // this.app.options('*',(req: Request, res:Response)=>{
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
        //     res.header("Access-Control-Allow-Headers", "Content-Type");
        //     res.status(204).send('Options');
        // });

        //  el server escucha desde este puerto
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${ this.port }`)
        })
    }
}
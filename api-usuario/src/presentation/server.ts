import * as express from 'express';
import { Router } from 'express';
import * as cors from "cors";

// Interfaz para definir las opciones que le pasamos al constructor del server
// es un objeto
interface Options{
    port?: number;
    routes:Router; // necesitamos rutas del tipo Router de express
}

export class Server {

    // creamos nuestra instancia de express
    // para ello debemos installar el paquete y tambien el tipado para este paquete
    public readonly app = express();

    private readonly port: number; // propiedad del puerto
    private readonly routes: Router;

    // No es propiamente la idea de constructor
    // sino que la idea es que podamos pasar las configuraciones y cmabios que queremos hacer en el servidor
    // trantando de aplicar el principio de responsabilidad única y llamar al contructor con sus propiedades y sus métodos
    // para realizar las acciones necesarias; en lugar de hacer modificaciones internas (nuestra clase esta abierta a la expansición, 
    // pero no a la modificación)
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
        this.app.options('*', cors())

        // agreamos las rutas al server
        this.app.use(this.routes)

        //  el server escucha desde este puerto
        this.app.listen(this.port, ()=>{
            console.log(`Server running on port ${ this.port }`)
        })
    }
}
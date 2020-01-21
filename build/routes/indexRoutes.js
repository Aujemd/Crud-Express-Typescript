"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Importaciones necesarias para la clase 
const express_1 = require("express");
//Clase de Routes
class IndexRoutes {
    //Constructor
    constructor() {
        this.router = express_1.Router();
    }
    //Metodo inicializador de rutas
    routes() {
        //Configuracion de rutas
        this.router.get('/', (req, res) => {
            res.send('Api: /api/posts');
        });
    }
}
//Generando el objeto de tipo IndexRoutes
const indexRoutes = new IndexRoutes();
//Usando el metodo routes
indexRoutes.routes();
//Exportando el objeto manejador de rutas de la clase
exports.default = indexRoutes.router;

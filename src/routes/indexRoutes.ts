//Importaciones necesarias para la clase 
import {Request, Response, Router} from 'express';

//Clase de Routes
class IndexRoutes {
    //Variable tipada manejadora de routas de la clase
    router: Router;

    //Constructor
    constructor(){
        this.router = Router();
    }

    //Metodo inicializador de rutas
    routes(){
           //Configuracion de rutas
           this.router.get('/', (req: Request, res: Response) =>{
            res.send('Api: /api/posts');
        });
    }
}
//Generando el objeto de tipo IndexRoutes
const indexRoutes = new IndexRoutes();
//Usando el metodo routes
indexRoutes.routes();

//Exportando el objeto manejador de rutas de la clase
export default indexRoutes.router;


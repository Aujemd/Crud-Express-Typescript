//Importación de express
import express from 'express';
//Importando Middleware Morgan
import morgan from 'morgan';
//Importando Middleware helmet
import helmet from 'helmet';
//Importando el manejador de rutas IndexRouter
import indexRoutes from  './routes/indexRoutes';
//Importando conexión con mongo
import mongoose from 'mongoose';
//Importando compresor de peticiones de la app
import compression from 'compression';
//Importando Modulo para conectar con front
import cors from 'cors';
//Importando manejador de rutas PostsRoutes
import PostsRoutes from './routes/PostRoutes';
//Importando manejador de rutas UsersRoutes
import UsersRoutes from './routes/UserRoutes';


//Clase Server
class Server{
    //Atributo de clase app tipado con la interface Application de express
    public app: express.Application;
    
    //Constructor de clase
    constructor(){
        //Inicializando la app
        this.app = express();
        //Configuraciones Necesarias de la app
        this.config();
        //Agregando Manejador de rutas
        this.routes();
    }

    config(){

        //Configuraciones de la db

        //Dirección de mongodb
        const MONGO_URI = 'mongodb://localhost/restapit';
        //Configurando Modulo de conexión
        mongoose.set('useFindAndModify', true);
        //Conectando con la db y configurando mongoose
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
        })
            .then(db => console.log('DB is conected'));

        //Configuraciones del servidor

        //Inicialiando el puerto de la app
        this.app.set('port', process.env.PORT || 3000);
        //Añadiendo el Middleware Morgan a la app
        this.app.use(morgan('dev'));
        //Middleware para manejar json
        this.app.use(express.json());
        //Middleware para manejar formularios html
        this.app.use(express.urlencoded({extended: false}));
        //Añadiendo el Middleware Helmet a la app
        this.app.use(helmet());
        //Añadiendo el Middleware compression a la app
        this.app.use(compression());
        //Añadiendo el Middleware cors a la app
        this.app.use(cors());
    }

    routes(){
        //Incluyendo manejador de rutas index
        this.app.use(indexRoutes);
        //Incluyendo manejador de rutas de posts
        this.app.use('/api/posts', PostsRoutes);
        //Incluyendo manejador de rutas de usuarios
        this.app.use('/api/users', UsersRoutes);
    }

    start(){
        //Levantando el servidor
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
            
        });
    }
}

//Generando el objeto de tipo server
const server = new Server();
//Usando el metodo que Levanta el servidor
server.start();
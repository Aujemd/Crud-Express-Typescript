"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importación de express
const express_1 = __importDefault(require("express"));
//Importando Middleware Morgan
const morgan_1 = __importDefault(require("morgan"));
//Importando Middleware helmet
const helmet_1 = __importDefault(require("helmet"));
//Importando el manejador de rutas IndexRouter
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
//Importando conexión con mongo
const mongoose_1 = __importDefault(require("mongoose"));
//Importando compresor de peticiones de la app
const compression_1 = __importDefault(require("compression"));
//Importando Modulo para conectar con front
const cors_1 = __importDefault(require("cors"));
//Importando manejador de rutas PostsRoutes
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
//Importando manejador de rutas UsersRoutes
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
//Clase Server
class Server {
    //Constructor de clase
    constructor() {
        //Inicializando la app
        this.app = express_1.default();
        //Configuraciones Necesarias de la app
        this.config();
        //Agregando Manejador de rutas
        this.routes();
    }
    config() {
        //Configuraciones de la db
        //Dirección de mongodb
        const MONGO_URI = 'mongodb://localhost/restapit';
        //Configurando Modulo de conexión
        mongoose_1.default.set('useFindAndModify', true);
        //Conectando con la db y configurando mongoose
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
        })
            .then(db => console.log('DB is conected'));
        //Configuraciones del servidor
        //Inicialiando el puerto de la app
        this.app.set('port', process.env.PORT || 3000);
        //Añadiendo el Middleware Morgan a la app
        this.app.use(morgan_1.default('dev'));
        //Middleware para manejar json
        this.app.use(express_1.default.json());
        //Middleware para manejar formularios html
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //Añadiendo el Middleware Helmet a la app
        this.app.use(helmet_1.default());
        //Añadiendo el Middleware compression a la app
        this.app.use(compression_1.default());
        //Añadiendo el Middleware cors a la app
        this.app.use(cors_1.default());
    }
    routes() {
        //Incluyendo manejador de rutas index
        this.app.use(indexRoutes_1.default);
        //Incluyendo manejador de rutas de posts
        this.app.use('/api/posts', PostRoutes_1.default);
        //Incluyendo manejador de rutas de usuarios
        this.app.use('/api/users', UserRoutes_1.default);
    }
    start() {
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

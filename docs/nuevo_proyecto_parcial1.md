# Nuevo proyecto
El servidor con express.js necesita tener npm, verificar con 
```bash
    npm -v
```

## Iniciar proyecto npm 
crea el package.json con 
```bash
    npm init
```
Agregarle al json creado el  "type": "module",

## Instalar paquetes
Buscar en la documentacion de npm.  https://www.npmjs.com/package/chalk
npm install <Paquete>

```bash
    npm i chalk # esta extension es para mostrar con estilos los mensajes por terminal.
    npm i dotenv # esta extension es para usar el .env, acceder a sus variables de entorno configuradas
    npm i express # esta extension instala express se usa para levantar el servidor con facilidades que esta libreria provee.
    npm i nodemon # esta extension se usa para no tener que apagar el servidor para que aplique los cambios, es un live server con auto refresh.
    npm i mongoose # esta extensión es para usar mongoDB
```
### Agregar en el package.json el comando para nodemon en el nodo "scripts"
```json
    {
    ...
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon index.js"
    },
    "dependencies": {
        "chalk": "xxx",
        "dotenv": "xxx",
        "express": "xxx",
        "mongoose": "xxx",
        "nodemon": "xxx"
    }
    ...
    }
```

### Crear el archivos en el direcrtorio raiz
Crear .env y .env.example, agregar las configuraciones de entorno
```conf 
    PORT=5000
    MONGODB_URI= mongodb+srv://<user>:<password>@cluster0.e0recaa.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0
```

Crear .gitignore, agregar carpetas y archivos a ignorar
```conf 
    node_modules/
    .env
```
Para configurar git, verse [GIT INIT](C:\4to CUATRI DaVinci\App hibridas\Aplicaciones-Hibridas\docs\git_nuevo_proyecto.md) 

### Crear el codigo base para levantar un server de express con las dependencias instaladas
Generar un archivo index.js en el directorio raiz
```js
import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dburi = process.env.MONGODB_URI;
const port= process.env.PORT;
const app = express();

// IMPORTAR RUTAS
//import routerAPI from "./routes/index.js";

//Conexion con la DB 
mongoose.connect(dburi);
const db = mongoose.connection;

db.on('error', () => {console.error({error})});
db.once('open', () => {console.log('Conexion a la db')});

app.use(express.json());
//app.use(express.static('public'));

//! Este no haría falta si se utiliza la linea (62) comentada "app.use(express.static('public'));"
app.get('/',(request, response)=>{ 
    console.log('Ruta raiz');
    response.send('Home');
})

// OBTENER ENDPOINTS DE RUTAS IMPORTADAS
//routerAPI(app);

app.listen(port, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${port}`));
});
```
Asi tal cual se utilice deberia funcionar el server. Probarlo y luego seguir programando la API.

Levantar el server con 
```bash
node index.js ## sin nodemon
|| 
npm start ## al tener nodemon configurado 
```
Se generará la carpeta "node_modules" en caso de no existir, con todas las dependencias necesarias.
Se podrá ingresar al server desde [localhost](http://127.0.0.1:5000/) o utilizar Postman.

## Crear directorios
```bash
    mkdir controllers
    mkdir models
    mkdir public
    mkdir routes 
```

## Ya debería funcionar! 
Resta hacer la API como tal, llenar las routes, controllers, models y public (este ultimo para la documentacion de la API) 
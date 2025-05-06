import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dburi = process.env.MONGODB_URI;
const port= process.env.PORT;
const app = express();
// IMPORTAR RUTAS
import routerAPI from "./routes/index.js";

//Conexion con la DB 
mongoose.connect(dburi);
const db = mongoose.connection;

db.on('error', () => {console.error({error})});
db.once('open', () => {console.log('Conexion a la db')});

app.use(express.json());
app.use(express.static('public'));

// OBTENER ENDPOINTS DE RUTAS IMPORTADAS
routerAPI(app);

app.listen(port, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${port}`));
});
import express from "express";
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();

const port= process.env.PORT;
const app = express();
import routerAPI from "./routes/index.js";

app.use(express.json());
app.use(express.static('public'));


app.get('/',(request, response)=>{
    console.log('Ruta raiz');
    response.send('Home');
})

routerAPI(app);

app.listen(port, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${port}`));
});
// npm install
// npm install express (agregar type: module)
import express from "express";
import chalk from "chalk";
import routerAPI from "./routes/index.js";

const port=5000;
const app = express();

app.use(express.json());


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
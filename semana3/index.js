import chalk from "chalk";
import express from 'express';

const port = 5000;
const app = express();

app.use(express.json()); //middleware para que funcione el POST con json.
////////////////////////
// exportar modulo product manager
import ProductManager from "./ProductManager.js";
//const { ProductManger } = require("../semana1/ejercicio_04/ProductManager");
const admin = new ProductManager();
////////////////////////


app.get('/', (request, response)=>{
    console.log('Ruta Raiz');
    response.send('Hola');
})

app.get('/productos', async (request, response)=>{
    const list = await admin.getProducts();
    response.json(list);
})

app.get('/productos/:id', async (request, response)=>{
    const id = request.params.id;
    const product = await admin.getProductById(id);
    if(product){
        response.json(product);
    }else{
        response.status(404).json({msg: 'No se encontró el producto'});
    }
})

app.post('/productos', async (request, response)=>{
    console.log('POST');
    const product = request.body;
    const id = await admin.addProduct(product);
    
    if(id){
        response.json({id});
    }else{
        response.status(404).json({msg: 'No se pudo crear el producto'});
    }
})

app.put('/productos/:id', async (request, response)=>{
    const id = request.params.id;
    const product = request.body;
    const updated = await admin.updateProduct(id, product);

    if(updated){
        response.json({id});
    }else{
        response.status(404).json({msg: 'No se encontró el producto'});
    }
})

app.delete('/productos/:id', async (request, response)=>{
    const id = request.params.id;
    const deleted = await admin.deleteProduct(id);

    if(deleted){
        response.json({msj:"Eliminado con éxito"});
    }else{
        response.status(404).json({msg: 'No se encontró el producto'});
    }
})

app.listen(port, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${port}`));
});

// console.log(chalk.bgCyan("Puerto "+port));
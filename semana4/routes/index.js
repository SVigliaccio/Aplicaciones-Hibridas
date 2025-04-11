import productsRouter from "./products-router.js";

function routerAPI( app ){
    //definimos cada ruta
    app.use('/productos', productsRouter);
}

export default routerAPI;
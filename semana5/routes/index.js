//import productsRouter from "./products-router.js";
import usersRouter from "./users-router.js";

function routerAPI( app ){
    //definimos cada ruta
    //app.use('/productos', productsRouter);
    app.use('/api/users', usersRouter );
}

export default routerAPI;
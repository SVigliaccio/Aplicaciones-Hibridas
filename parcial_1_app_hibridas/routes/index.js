import usersRouter from "./users-router.js";
import productsRouter from "./products-router.js";
import categoriesRouter from "./categories-router.js";

function routerAPI( app ){
    //definimos cada ruta
    app.use('/api/users', usersRouter );
    app.use('/api/products', productsRouter );
    app.use('/api/categories', categoriesRouter );
}

export default routerAPI;
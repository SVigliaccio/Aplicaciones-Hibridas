const http = require('http'); 
const port = 3000;

////////////////////////
// exportar modulo product manager
const { ProductManger } = require("../../semana1/ejercicio_04/ProductManager");
const admin = new ProductManger();
////////////////////////

const server = http.createServer(async (request, response)=>{
    //                  estados 
    //200 se completó la transaccion correctamente
    //300 se completo la transaccion inconclusamente
    //400 error por el request del cliente

    const url = request.url;
    let body = '';
    let status = 200;
    //console.log(url);
    if(url == '/'){
        body = '<h1>Bienvenido </h1>';
    }else if(url == '/products'){
        body = '<h1>Lista de productos</h1>';
        const list = await admin.readProductsJSON();
        
        list.forEach(element => {
            body += `
                <h2>Producto ${element.name}</h2>
                <ul>
                <li>${element.description}</li>
                <li>${element.image}</li>
                <li>${element.price}</li>
                </ul>
            `;
        });

    }else if(url.includes('/products/')){
        let id_param = url.split('/')[2];
        body = '<h1>Detalle Producto</h1>';
        const list = await admin.readProductsJSON();
        let item = list.find(reg => reg.id == id_param);
        
        if(item){
            body += `
                <h2>Producto ${item.name}</h2>
                <ul>
                <li>${item.description}</li>
                <li>${item.image}</li>
                <li>${item.price}</li>
                </ul>
            `;
        }else{
            status = 404;
            body ='<h1>Página no encontrada</h1>';
        }

    }else if(url == '/login'){
        body = '<h1>Login</h1>';
    }else{
        status = 404;
        body ='<h1>Página no encontrada</h1>';
    }

    // aca se aclara el tipo de archivo. text/html (este renderiza el html), text/plain, etc.
    response.writeHead(status, {'content-type': 'text/html'} ); //head
    response.end(body); //Body
    console.log('Un cliente conectado...');
} );



server.listen(port, () => {
    console.log(`Servidor web corriendo en el puerto ${port}`);
})
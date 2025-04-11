# Servidor con express.js
Se necesita tener npm, verificar con 
npm -v

## Iniciar proyecto npm 
crea el package.json con 
npm init

Agregarle al json creado el  "type": "module",

## Instalar paquetes
Buscar en la documentacion de npm.  https://www.npmjs.com/package/chalk
npm install <Paquete>

// mongo db y express para el parcialito

## API REST
POST: Se utiliza para enviar datos al servidor. Este metodo es mas seguro que GET, ya que la informacion no viaja a raves de la
URL.
DELETE: Este se utiliza para eliminacion de recursos.
PUT: Reemplaza un dato completo.
PATCH: Reemplaza un dato parcialmente. Por ejemplo, el stock de un producto.

Poner la entidad y el verbo, por ejemplo, el endpoint no debe llamar "usuarioEliminar"
Deberia llamarse solo usuario y usar el metodo DELETE. 
Sería DELETE /usuario.

## Instalar Express 
Es lo que se usa HOY para crear servidores, es lo que sería laravel para php.
npm install express

Generar un archivo index.js
```js
import express from 'express';
const port = 5000;
const app = express();

app.get('/', (request, response)=>{
    console.log('Ruta Raiz');
    response.send('Home');
})

app.listen(port, () => {
    console.log(chalk.green(`Servidor Web en el puerto ${port}`));
});
```
Levantar el server con 
```bash
node index.js
```
e ingresar desde [localhost](http://127.0.0.1:5000/)
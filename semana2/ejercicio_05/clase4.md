# Servidor Web con módulo nativo NODE.

## Servidor básico
Podemos crear un servidor web básico en Node.js, 
usando el módulo nativo HTTP que viene intregado en Node.js
```js
const http = require('http'); // o usar import()
const port = 3000;

const server = http.createServer( (resquest, response)=>{
    //                  estado 
    response.writeHead(200, {'content-type': 'text/plain'} );

    //Body
    response.end('Hola desde el servidor Node.js'); // funciona como return, ahi termina la "ejecucion"
    console.log('Un cliente conectado...');
} );



server.listen(port, () => {
    console.log(`Servidor web corriendo en el puerto ${port}`);
})
```
## Ejecutar server
Se prueba desde http://127.0.0.1:3000/
```bash
#se ejecuta con 
node servidor.js
```

https://nodejs.org/docs/latest/api/http.html


# Uso de bd NoSQL (MongoDB) 
Usar app MongoDB Compass o directamente la web para ver la bd
https://cloud.mongodb.com/v2/67fe5ae7ce462648f9e03fd1#/overview

DOC metodos de mongoose -> https://mongoosejs.com/docs/api/model.html#Model()
DOC tipos de datos -> https://mongoosejs.com/docs/schematypes.html

## Instalación de mongoose
```bash
#se ejecuta con 
npm i mongoose
```

## Agregar en el .env la ruta a la bd (puede ser local o un sv)
```conf
    MONGODB_URI= mongodb+srv://<user>:<password>@cluster0.e0recaa.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0
```

## En el index.js del directorio raiz, colocar:
```js
import mongoose from "mongoose";
dotenv.config();

const dburi = process.env.MONGODB_URI;

//Conexion con la DB 
mongoose.connect(dburi);
const db = mongoose.connection;

db.on('error', () => {console.error({error})});
db.once('open', () => {console.log('Conexion a la db')});

```

## Extra
Instalacion de paquete para manejar los id autonumericos con mongoose.
```sh
npm install mongoose-sequence
```

import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret_key = process.env.SECRET_KEY;

//Validamos
const validacionToken = (req, res, next) => {
    const auth = req.headers.authorization;
    
    if(!auth){
        res.status(401).json({msg: 'No se paso el jwt'})
    }

    const token = auth.split(' ')[1];

    jsonwebtoken.verify(token, secret_key, ( error, decoded ) => {
        if(error){
            res.status(403).json({msg: 'Token inválido'});
        }
        //req.body.userId = decoded.id;
    });
    next(); //para que siga con la peticion
}


//Validamos
const validacionTokenPUT = (req, res, next) => {
    const auth = req.headers.authorization;
    
    if(!auth){
        res.status(401).json({msg: 'No se paso el jwt'})
    }

    const token = auth.split(' ')[1];

    jsonwebtoken.verify(token, secret_key, ( error, decoded ) => {
        if(error){
            res.status(403).json({msg: 'Token inválido'});
        }
        req.body.userId = decoded.id;
    });
    next(); //para que siga con la peticion
}

export { validacionToken, validacionTokenPUT };
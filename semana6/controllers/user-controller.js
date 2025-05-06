//import UsersManager from "../models/UsersManager.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret_key = process.env.SECRET_KEY;
const salt = 10;
//const userModel = new UsersManager();

const auth =  async (request, response) => {
    const { email, password} = request.body;
    const user = await User.findOne({email: email});

    if(!user){
        return response.status(404).json({msg: "El usuario es inválido"});
    }

    const passOk = bcrypt.compare(password, user.password);

    if(!passOk){
        return response.status(404).json({msg: "Contraseña inválida"});
    }

    // Generacion de Token
    const data = {
        id: user._id,
        email: user.email
    }
    const jwt = jsonwebtoken.sign(data, secret_key, {expiresIn: '1h'});

    response.json({msg: "Credenciales correctas", token: jwt});
}

const getUsers = async( request, response) =>{
    const users = await User.find(); // User.find({name:'carlos'}) para buscar por atributo
    response.status(200).json( users);
}
const getUserById = async( request, response) => {
    const id = request.params.id;
    const user = await User.findById(id);
    if ( user) {
        response.status(200).json( user );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

//TODO: El unico con jwt
const addUser = async(request, response) => {
    const user = request.body;

    if(!user.name || !user.email || !user.password){
        return response.status(403).json({msg: "Faltan parametros"})
    }
    console.log({user});

    const passwordHash = await bcrypt.hash(user.password, salt);

    user.password = passwordHash;

    const doc = new User(user);
    await doc.save();
    //const id = await userModel.addUser(user);
    response.json( {msg: "Usuario creado", data: {id: doc._id, name: doc.name}} );
}

const updateUser =  async (request, response)=>{
    
    const id = request.params.id;
    const user = request.body;

    const new_user = await User.findByIdAndUpdate(id, user, {new: true})
    
    if ( new_user ) {
        response.json( {msg: 'Usuario actualizado', data: {new_user}} );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const deleteUser =  async (request, response) => {
    const id = request.params.id;

    const status = await User.findByIdAndDelete(id);
    if ( status) {
        response.json( {msg: 'Usuario eliminado'} );
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

export { getUsers, getUserById, addUser, updateUser, deleteUser, auth}
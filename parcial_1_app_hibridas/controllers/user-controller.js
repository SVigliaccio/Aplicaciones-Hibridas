import User from "../models/user-model.js";
import bcrypt from "bcrypt";
const salt = 10;

const getUsers = async (request, response) => {
    const users = await User.find().lean(); // .lean() devuelve objetos planos en lugar de instancias de Mongoose (más rápido y fácil de manipular).
  
    const cleaned_users = users.map(user => {
      const { _id, __v, password, ...rest } = user;
      return { id: _id.toString(), ...rest }; // Elimina el campo password y __v, renombra _id a id y devuelve el resto de los campos.
    });
  
    response.status(200).json({users: cleaned_users});
  };

const getUserById = async( request, response) => {
    const id = request.params.id;
    const user = await User.findById(id).lean();// .lean() para no tener que acceder a _doc, devuelve un objeto plano
    if ( user) {
        const { _id, __v, ...rest } = user;
        response.status(200).json({id: _id.toString(), ...rest});
    } else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const addUser = async(request, response) => {
    const user = request.body;

    if(!user.name || !user.email || !user.password){
        return response.status(403).json({msg: "Faltan parámetros"})
    }
    
    // Validaciones de tipo y longitud
    if (typeof user.name !== 'string' || user.name.length < 3 || user.name.length > 50) {
        return response.status(400).json({msg: "El nombre debe ser un texto entre 3 y 50 caracteres"});
    }
    
    if (typeof user.email !== 'string' || !user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return response.status(400).json({msg: "El email debe tener un formato válido"});
    }
    
    if (typeof user.password !== 'string' || user.password.length < 6 || user.password.length > 100) {
        return response.status(400).json({msg: "La contraseña debe tener entre 6 y 100 caracteres"});
    }

    const password_hash = await bcrypt.hash(user.password, salt);

    user.password = password_hash;

    const doc = new User(user);
    await doc.save();
    
    response.status(201).json( {msg: "Usuario creado", data: {id: doc._id, name: doc.name}} );
}

const updateUser =  async (request, response)=>{
    
    const id = request.params.id;
    const user = request.body;

    if(!user.name || !user.email || !user.password){
        return response.status(403).json({msg: "Faltan parámetros"})
    }   
    
    // Validaciones de tipo y longitud
    if (typeof user.name !== 'string' || user.name.length < 3 || user.name.length > 50) {
        return response.status(400).json({msg: "El nombre debe ser un texto entre 3 y 50 caracteres"});
    }
    
    if (typeof user.email !== 'string' || !user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return response.status(400).json({msg: "El email debe tener un formato válido"});
    }
    
    if (typeof user.password !== 'string' || user.password.length < 6 || user.password.length > 100) {
        return response.status(400).json({msg: "La contraseña debe tener entre 6 y 100 caracteres"});
    }

    user.password = await bcrypt.hash(user.password, salt);

    const new_user = await User.findByIdAndUpdate(id, user, {new: true});
    
    if ( new_user ) {
        response.json( {msg: 'Usuario actualizado', data: {id: new_user._id, name: new_user.name}} );
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

export { getUsers, getUserById, addUser, updateUser, deleteUser}
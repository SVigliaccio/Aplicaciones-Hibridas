import Category from "../models/category-model.js";

const getCategories = async( request, response) =>{
    const categories = await Category.find().lean();
    const cleaned_categories = categories.map(category => {
        const { _id, __v, ...rest } = category;
        return { id: _id.toString(), ...rest };
      });

      response.status(200).json({categories: cleaned_categories});
}

const getCategoryById = async( request, response) => {
    const id = request.params.id;
    
    // Validación del ID
    if (isNaN(id)) {
        return response.status(400).json({msg: 'El ID debe ser un número'});
    }
    
    const category = await Category.findById(Number(id)).lean(); // .lean() para no tener que acceder a _doc, devuelve un objeto plano
    if (category) {
        const { _id, __v, ...rest } = category;
        response.status(200).json({id: _id, ...rest});
    } else {
        response.status(404).json({msg: 'No se encontro la categoria'});
    }
}

const addCategory = async(request, response) => {
    const category = request.body;

    if(!category.name || !category.description){
        return response.status(403).json({msg: "Faltan parámetros"})
    }
    
    // Validaciones de tipo y longitud
    if (typeof category.name !== 'string' || category.name.length < 3 || category.name.length > 50) {
        return response.status(400).json({msg: "El nombre debe ser un texto entre 3 y 50 caracteres"});
    }
    
    if (typeof category.description !== 'string' || category.description.length < 10 || category.description.length > 200) {
        return response.status(400).json({msg: "La descripción debe ser un texto entre 10 y 200 caracteres"});
    }

    // Creacion de la categoria
    const doc = new Category(category);
    await doc.save();
    response.status(201).json( {msg: "Categoria creada", data: {id: doc._id, name: doc.name, description: doc.description}} );
}

const updateCategory =  async (request, response)=>{
    
    const id = request.params.id;
    const category = request.body;

    // Validación del ID
    if (isNaN(id)) {
        return response.status(400).json({msg: 'El ID debe ser un número'});
    }

    if(!category.name || !category.description){
        return response.status(403).json({msg: "Faltan parámetros"})
    }
    
    // Validaciones de tipo y longitud
    if (typeof category.name !== 'string' || category.name.length < 3 || category.name.length > 50) {
        return response.status(400).json({msg: "El nombre debe ser un texto entre 3 y 50 caracteres"});
    }
    
    if (typeof category.description !== 'string' || category.description.length < 10 || category.description.length > 200) {
        return response.status(400).json({msg: "La descripción debe ser un texto entre 10 y 200 caracteres"});
    }  

    // Actualizacion de la categoria
    const new_category = await Category.findByIdAndUpdate(Number(id), category, {new: true})
    
    if ( new_category ) {
        response.json( {msg: 'Categoria actualizada', data: {id: new_category._id, name: new_category.name, description: new_category.description}} );
    } else {
        response.status(404).json({msg: 'No se encontro la categoria'});
    }
}

const deleteCategory =  async (request, response) => {
    const id = request.params.id;
    
    // Validación del ID
    if (isNaN(id)) {
        return response.status(400).json({msg: 'El ID debe ser un número'});
    }

    const status = await Category.findByIdAndDelete(Number(id));
    if ( status) {
        response.json( {msg: 'Categoria eliminada'} );
    } else {
        response.status(404).json({msg: 'No se encontro la categoria'});
    }
}

export { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory}
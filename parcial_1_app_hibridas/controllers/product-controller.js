import Product from "../models/product-model.js";

const getProducts = async( request, response) =>{
    try {
        // Filtrado por parámetros
        const { category, minPrice, maxPrice, name } = request.query;
        let filter = {};
        
        // Filtrado por categoría
        if (category) {
            filter.category = Number(category);
        }
        
        // Filtrado por rango de precio
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        
        // Búsqueda por nombre (puede ser parcial)
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        
        const products = await Product.find(filter).lean();
        const cleaned_products = products.map(product => {
            const { _id, __v, ...rest } = product;
            return { id: _id.toString(), ...rest };
        });

        response.status(200).json({products: cleaned_products});
    } catch (error) {
        response.status(500).json({msg: "Error al obtener productos", error: error.message});
    }
}

const getProductById = async( request, response) => {
    const id = request.params.id;
    const product = await Product.findById(id).lean(); // .lean() para no tener que acceder a _doc, devuelve un objeto plano
    if ( product) {
        const { _id, __v, ...rest } = product;
        response.status(200).json({id: _id.toString(), ...rest});
    } else {
        response.status(404).json({msg: 'No se encontro el producto'});
    }
}

const addProduct = async(request, response) => {
    const product = request.body;

    if(!product.name || !product.description || !product.category || !product.price){
        return response.status(403).json({msg: "Faltan parámetros"})
    }
    
    // Validaciones de tipo y longitud
    if (typeof product.name !== 'string' || product.name.length < 3 || product.name.length > 50) {
        return response.status(400).json({msg: "El nombre debe ser un texto entre 3 y 50 caracteres"});
    }
    
    if (typeof product.description !== 'string' || product.description.length < 10 || product.description.length > 200) {
        return response.status(400).json({msg: "La descripción debe ser un texto entre 10 y 200 caracteres"});
    }
    
    if (typeof product.category !== 'number' || product.category < 1) {
        return response.status(400).json({msg: "La categoría debe ser un número positivo"});
    }
    
    if (typeof product.price !== 'number' || product.price <= 0) {
        return response.status(400).json({msg: "El precio debe ser un número mayor a 0"});
    }

    // Creacion del producto
    const doc = new Product(product);
    await doc.save();
    response.status(201).json( {msg: "Producto creado", data: {id: doc._id, name: doc.name, category: doc.category, price: doc.price}} );
}

const updateProduct =  async (request, response)=>{
    
    const id = request.params.id;
    const product = request.body;

    if(!product.name || !product.description || !product.category || !product.price){
        return response.status(403).json({msg: "Faltan parámetros"})
    }
    
    // Validaciones de tipo y longitud
    if (typeof product.name !== 'string' || product.name.length < 3 || product.name.length > 50) {
        return response.status(400).json({msg: "El nombre debe ser un texto entre 3 y 50 caracteres"});
    }
    
    if (typeof product.description !== 'string' || product.description.length < 10 || product.description.length > 200) {
        return response.status(400).json({msg: "La descripción debe ser un texto entre 10 y 200 caracteres"});
    }
    
    if (typeof product.category !== 'number' || product.category < 1) {
        return response.status(400).json({msg: "La categoría debe ser un número positivo"});
    }
    
    if (typeof product.price !== 'number' || product.price <= 0) {
        return response.status(400).json({msg: "El precio debe ser un número mayor a 0"});
    } 

    // Actualizacion del producto
    const new_product = await Product.findByIdAndUpdate(id, product, {new: true});
    
    if ( new_product ) {
        response.json( {msg: 'Producto actualizado', data:  {id: new_product._id, name: new_product.name, category: new_product.category, price: new_product.price}} );
    } else {
        response.status(404).json({msg: 'No se encontro el producto'});
    }
}

const deleteProduct =  async (request, response) => {
    const id = request.params.id;

    const status = await Product.findByIdAndDelete(id);
    if ( status) {
        response.json( {msg: 'Producto eliminado'} );
    } else {
        response.status(404).json({msg: 'No se encontro el producto'});
    }
}

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct }
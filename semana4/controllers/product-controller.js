import productManager from "../models/ProductManager.js";

const productModel = new productManager();

const getProducts = async( request, response) => {
    const products = await productModel.getProducts();
    response.status(200).json(products);
}

const getProductById = async( request, response) => {
    const id = request.params.id;
    const product = await productModel.getProductById(id);
    if(product){
        response.json(product);
    }else{
        response.status(404).json({msg: 'No se encontró el producto'});
    }
}

const addProduct = async(request, response) => {
    console.log('POST');
    const product = request.body;
    const id = await productModel.addProduct(product);
    
    if(id){
        response.json({id});
    }else{
        response.status(404).json({msg: 'No se pudo crear el producto'});
    }
}

const updateProduct = async(request, response) => {
    const id = request.params.id;
    const product = request.body;
    const updated = await productModel.updateProduct(id, product);

    if(updated){
        response.json({id});
    }else{
        response.status(404).json({msg: 'No se encontró el producto'});
    }
}
const deleteProduct = async(request, response) => {
    const id = request.params.id;
    const deleted = await productModel.deleteProduct(id);

    if(deleted){
        response.json({msj:"Eliminado con éxito"});
    }else{
        response.status(404).json({msg: 'No se encontró el producto'});
    }
}


export { getProducts, getProductById, addProduct, updateProduct, deleteProduct }
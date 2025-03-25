class ProductManger{
    products = [];
    constructor(products=[]){
        this.products = products
    }
    // { name: 'TV 32', description: 'TV LG 32', image: 'foto.jpg', price: 54000}
    addProduct(product){
        // debería validar los campos
        this.products.push(product);
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const product = this.products.find(  item => item.id == id  );
        return product ? product : {};
    }

    writeProductsJSON(){
        const fs = require('fs');
        const path = './productos.json';
        const data = JSON.stringify(this.products); //convierto objeto a string con formato json

        fs.writeFile(path, data, function(err){
            if(err){
                console.error('ocurrio un error');
            }else{
                console.info('Todo bien');
            }
        })
    }

    readProductsJSON(){
        const fs = require('fs');
        const path = "./productos.json";

        fs.readFile(path, function(err, data){
            if(err){
                console.error('Ocurrio un error');
            }else{
                console.log(JSON.parse(data));
            }
        })
    }

}

module.exports = {ProductManger}
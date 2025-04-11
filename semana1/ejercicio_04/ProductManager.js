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

    async readProductsJSON() {
        const fs = require('fs').promises;
        const path = "./productos.json";
    
        try {
            const data = await fs.readFile(path, 'utf-8');
            console.log(JSON.parse(data));
            return JSON.parse(data);
        } catch (err) {
            console.error('Ocurrió un error', err);
            return [];
        }
    }

}

module.exports = {ProductManger}
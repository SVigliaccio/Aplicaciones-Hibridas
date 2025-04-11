const fs = require('fs/promises');
const crypto = require("crypto");
const path = 'productos.json';


class ProductManger{
    products = [];
    constructor(products=[]){
        this.products = products
    }

    generateRandomID(){
        return crypto.randomUUID();
    }//ccusi
    // { name: 'TV 32', description: 'TV LG 32', image: 'foto.jpg', price: 54000}
    async addProduct(product){
        product.id = this.generateRandomID();
        //TODO: leer los productos
        await this.getProducts();
        //TODO: concatenar con producto actual
        this.products.push(product);
        //TODO: Parsear el objeto a json
        const data = JSON.stringify(this.products); //convierto objeto a string con formato json

        try {
            const res = await fs.writeFile(path, data);

        } catch (error) {
            console.error(error);
        }
    }

    async getProducts(){
        try {
            const data = await fs.readFile(path);
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            console.error(error);
        }
    }

    getProductById(id){
        const product = this.products.find(  item => item.id == id  );
        return product ? product : {};
    }
}

module.exports = {ProductManger}
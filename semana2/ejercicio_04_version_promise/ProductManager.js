const fs = require('fs/promises');
const path = 'productos.json';

class ProductManger{
    products = [];
    constructor(products=[]){
        this.products = products
    }
    // { name: 'TV 32', description: 'TV LG 32', image: 'foto.jpg', price: 54000}
    async addProduct(product){
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
            console.log(this.products);
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
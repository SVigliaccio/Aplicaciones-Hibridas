import fs from "fs/promises";
import crypto from "crypto";
//const crypto = require("crypto");
const path = './productos.json';


class ProductManager{
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
        //leer los productos
        await this.getProducts();
        //concatenar con producto actual
        this.products.push(product);
        //Parsear el objeto a json
        const data = JSON.stringify(this.products); //convierto objeto a string con formato json

        try {
            const res = await fs.writeFile(path, data);
            return product.id;
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

    // getProductById(id){
    //     const product = this.products.find(  item => item.id == id  );
    //     return product ? product : {};
    // }

    async getProductById(id){
        const products = await this.getProducts();
        const product = products.find(  item => item.id == id  );
        return product ? product : undefined;
    }

    async updateProduct(id, product){
        const products = await this.getProducts();
        const index = products.findIndex(function(product){
            return product.id == id;
        });

        if(index>=0){
            product.id = id;
            products[index] = product;

            const data = JSON.stringify(this.products);

            try {
                const res = await fs.writeFile(path, data);
                return product.id;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }else{
            return undefined;
        }

    }

    async deleteProduct(id){
        const products = await this.getProducts();
        const index = products.findIndex(function(product){
            return product.id == id;
        });

        if(index>=0){
            const data = JSON.stringify( products.filter((product) => product.id != id) );

            try {
                const res = await fs.writeFile(path, data);
                return id;
            } catch (error) {
                console.error(error);
                return undefined;
            }
        }else{
            return undefined;
        }
    }
}

//module.exports = {ProductManager}
export default ProductManager;
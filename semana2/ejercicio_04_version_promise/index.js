const { ProductManger } = require("./ProductManager");
const crypto = require("crypto");

const admin = new ProductManger();
// const test = async function(){
//     await admin.addProduct({ id, name: 'TV 32', description: 'TV LG 32', image: 'foto.jpg', price: 54000});

//     id = 2;//crypto.randomUUID();
//     await admin.addProduct({ id, name: 'Celular TCL', description: 'Celular TCL 34', image: 'foto2.jpg', price: 23000});
// }

const test2 = async () => {
    let id = crypto.randomUUID();
    await admin.addProduct({ id, name: 'TV 32', description: 'TV LG 32', image: 'foto.jpg', price: 54000});

    id = crypto.randomUUID();
    await admin.addProduct({ id, name: 'Celular TCL', description: 'Celular TCL 34', image: 'foto2.jpg', price: 23000});
}

test2();
admin.getProducts();
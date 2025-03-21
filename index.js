const { ProductManger } = require("./ProductManager");

p1 = new ProductManger();
p1.addProduct({ name: 'TV 32', description: 'TV LG 32', image: 'foto.jpg', price: 54000});

p1.readProductsJSON();
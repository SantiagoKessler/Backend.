const fs = require('fs');

class ProductManager {
  static #products = [];
  static #dataFilePath = 'products.json';

  id;
  title;
  photo;
  price;
  stock;

  constructor() {
    this.loadDataFromFile();
  }

  create(data) {
    const requiredProps = ["title", "photo", "price", "stock"];
    const missingProps = [];

    for (const prop of requiredProps) {
      if (!data[prop]) {
        missingProps.push(prop);
      }
    }

    if (missingProps.length) {
      console.log(`Propiedades faltantes: ${missingProps.join(" ")}`);
    } else {
      const id = this.#generateProductId();
      const newProduct = { id, ...data };
      ProductManager.#products.push(newProduct);
      this.saveDataToFile();
    }
  }

  read() {
    return ProductManager.#products;
  }

  #generateProductId() {
    return (
      ProductManager.#products[ProductManager.#products.length - 1]?.id + 1 || 1
    );
  }

  loadDataFromFile() {
    try {
      const data = fs.readFileSync(ProductManager.#dataFilePath, 'utf8');
      ProductManager.#products = JSON.parse(data);
    } catch (error) {
  
      ProductManager.#products = [];
    }
  }

  saveDataToFile() {
    fs.writeFileSync(ProductManager.#dataFilePath, JSON.stringify(ProductManager.#products), 'utf8');
  }
}

const prodManager = new ProductManager();


prodManager.create({
  title: "Iphone11",
  photo: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  price: 700,
  stock: 25,
});


console.log(prodManager.read());


prodManager.create({
  title: "Iphone 13",
  photo: "https://images.unsplash.com/photo-1647503380147-e075b24f4cbe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  price: 800,
  stock: 20,
});

prodManager.create({
  title: "Iphone 15",
  photo: "https://images.unsplash.com/photo-1695048132783-4b9f77bde5be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  price: 1000,
  stock: 15,
});


console.log(prodManager.read());

var inquirer = require("inquirer");
var mysql = require("mysql");

//creates a sql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "@Ranger1",
  database: "bamazon"
});

connection.connect(function(err, res) {
  if (err) throw err;
});

//outputs all the products
var getAllProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n----------------------------------------------");
    console.log("all available products: ");

    res.forEach(product => {
      console.log(
        `ID: ${product.item_id} | Product: ${
          product.product_name
        } | Department: ${product.department_name}  | Price: ${
          product.price
        } | Stock: ${product.stock_quantity}`
      );
    });
    console.log("----------------------------------------------");
  });
};

var getProductsWithLowStock = function() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    err,
    res
  ) {
    if (err) throw err;

    console.log("\n----------------------------------------------");
    console.log("LOW INVENTORY PRODUCTS: ");

    res.forEach(product => {
      console.log(
        `ID: ${product.item_id} | Product: ${
          product.product_name
        } | Department: ${product.department_name}  | Price: ${
          product.price
        } | Stock: ${product.stock_quantity}`
      );
    });
    console.log("----------------------------------------------");
  });
};

inquirer
  .prompt([
    {
      type: "list",
      name: "input",
      choices: [
        "View Products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    }
  ])
  .then(function(res) {
    if (res.input === "View Products for sale") {
      getAllProducts();
    } else if (res.input === "View low inventory") {
      getProductsWithLowStock();
    }

    console.log(res);
  });

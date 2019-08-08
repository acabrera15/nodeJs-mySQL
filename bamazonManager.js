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
    startManager();
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
    startManager();

  });
};

var addToInventory = function() {
  inquirer
    .prompt([
      {
        message: "Enter what product inventory you would like to update: ",
        name: "product",
        type: "input"
      }
    ])
    .then(function(res) {
      connection.query(
        "SELECT * FROM products WHERE product_name = ?",
        [res.product],
        function(err, response) {
          if (err) throw err;

          if (response.length === 0) {
            console.log(`The item ${res.product} is not in the database`);
          } else {
            console.log(
              `The current stock of ${res.product} is ${
                response[0].stock_quantity
              }`
            );

            inquirer
              .prompt([
                {
                  message: "What would you like to change the stock to?",
                  name: "newStock",
                  type: "number"
                }
              ])
              .then(function(stockChangeResponse) {

                connection.query(
                  "UPDATE products SET stock_quantity = ? WHERE product_name = ?",
                  [stockChangeResponse.newStock, res.product],
                  function(err) {
                    if (err) throw err;

                    console.log("The stock has been updated");

                    getAllProducts();
                  }
                );
              });
          }
        }
      );
    });
};

var addNewProduct = function() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "productName",
        message: "Enter product Name: "
      },
      {
        type: "input",
        name: "department",
        message: "Enter item department: "
      },
      {
        type: "number",
        name: "price",
        message: "Enter the price"
      },
      {
        type: "number",
        name: "stock",
        message: "Enter the stock count: "
      }
    ])
    .then(function(response) {

      connection.query(
        "INSERT INTO products" +
          "(product_name, department_name, price, stock_quantity) " +
          "VALUES(?, ?, ?, ?)",
        [
          response.productName,
          response.department,
          response.price,
          response.stock
        ],
        function(res) {
          console.log(res);
          startManager();
        }
      );
    });
};

var startManager = function() {
inquirer
  .prompt([
    {
      type: "list",
      name: "input",
      choices: [
        "View Products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product",
        "EXIT"
      ]
    }
  ])
  .then(function(res) {
    if (res.input === "View Products for sale") {
      getAllProducts();
    } else if (res.input === "View low inventory") {
      getProductsWithLowStock();
    } else if (res.input === "Add to inventory") {
      addToInventory();
    } else if (res.input === "Add new product") {
      addNewProduct();
    } else {
      console.log("GOODBYE");
      connection.end();
    }
  });
};
startManager();
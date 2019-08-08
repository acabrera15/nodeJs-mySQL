var mysql = require("mysql");
var inquirer = require("inquirer");

//creates a sql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "@Ranger1",
  database: "bamazon"
});

//outputs all the products
var getAllProducts = function(continueFunction) {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n----------------------------------------------");
    console.log("all available products: ");

    res.forEach(product => {
      console.log(
        `ID: ${product.item_id} Product: ${product.product_name} Department: ${
          product.department_name
        } Price: ${product.price} Stock: ${product.stock_quantity}`
      );
    });
    console.log("----------------------------------------------");

    if (continueFunction != undefined) {
      continueFunction();
    }
  });
};

var checkItemAndUpdate = function(ID, quantity) {
  connection.query("SELECT * FROM products WHERE item_id = ?", [ID], function(
    err,
    res
  ) {
    if (err) throw err;

    if (res.length === 0) {
      console.log("Entry does not exist");
    } else {
      if (quantity > res[0].stock_quantity) {
        console.log(`There are not enough ${res[0].product_name}!`);
        console.log(`Please input a number less than ${res[0].stock_quantity}`);
      } else {
        var totalPrice = quantity * res[0].price;
        var newQuantity = res[0].stock_quantity - quantity;
        console.log(
          `Your total price for ${quantity} ${res[0].product_name} at $${
            res[0].price
          } is:`
        );
        console.log("$" + totalPrice);
        var sales = res[0].product_sales;
        if (sales === null) {
          sales = 0;
        }

        sales += totalPrice;

        connection.query(
          "UPDATE products SET stock_quantity = ?, product_sales = ?  WHERE item_id = ?",
          [newQuantity, sales, ID],
          function(err, res) {
            if (err) throw err;
            getAllProducts();
            connection.end();
          }
        );
      }
    }
  });
};

/**
 * starts the application. The application will prompt the user for the an ID
 * entry and a quantity entry.  A function will be called to check the input
 * if the inputs are number and are valid.
 */
var startApplication = function() {
  inquirer
    .prompt([
      {
        message: "Enter the ID of the product you would like to buy: ",
        type: "input",
        name: "productID",
        validate: function(input) {
          if (isNaN(input) === false) {
            return true;
          }
          return false;
        }
      },
      {
        message: "Enter the quantity of the item",
        type: "input",
        name: "quantityInput",
        validate: function(input) {
          if (isNaN(input) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(res) {
      checkItemAndUpdate(Number(res.productID), Number(res.quantityInput));
    });
};

//makes the connection to the sql DB
connection.connect(function(err, res) {
  if (err) throw err;

  getAllProducts(startApplication);
});

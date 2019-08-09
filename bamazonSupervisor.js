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

//connect mySQL
connection.connect(function(err, res) {
  if (err) throw err;
});

var getSalesByDepartment = function() {
  connection.query(
    "SELECT departments.department_id, departments.department_name, departments.overhead_costs, products.product_sales " +
      "FROM departments " +
      "INNER JOIN products ON departments.department_name = products.department_name",
    function(err, res) {
      if (err) throw err;

      console.log(
        "-------------------------------------------------------------------------------------------------------------------------------------------------"
      );

      res.forEach(element => {
        if (element.product_sales === null) {
          element.product_sales = 0;
        }
        var totalProfit = element.product_sales - element.overhead_costs;

        console.log(
          `Department ID: ${element.department_id} | Department Name: ${
            element.department_name
          } | Overhead Costs: ${element.overhead_costs} | Product Sales: ${
            element.product_sales
          } | Total Profit: ${totalProfit}`
        );
      });

      // console.log(res);
      console.log(
        "-------------------------------------------------------------------------------------------------------------------------------------------------\n"
      );
    }
  );
};

var addNewItemToDepartments = function() {
  inquirer
    .prompt([
      {
        message: "Enter a new Department you would like to add: ",
        type: "input",
        name: "newDepartment"
      },
      {
        message: "Enter the the overhead costs: ",
        type: "number",
        name: "overheadCosts"
      }
    ])
    .then(function(inquirerResponse) {
      var newDepartment = inquirerResponse.newDepartment;
      var overheadCosts = inquirerResponse.overheadCosts;

      connection.query(
        "INSERT INTO departments (department_name, overhead_costs) " +
          "VALUES (?, ?)",
        [newDepartment, overheadCosts],
        function(err) {
          if (err) throw err;

          console.log(`${newDepartment} successfully added`);
        }
      );
    });
};

inquirer
  .prompt([
    {
      message: "Select what you would like to do Supervisor: ",
      name: "input",
      type: "list",
      choices: [
        "View Product Sales By Department",
        "Create New Department",
        "EXIT"
      ]
    }
  ])
  .then(function(inquirerResponse) {

    if (inquirerResponse.input === "View Product Sales By Department") {
      getSalesByDepartment();
    } else if (inquirerResponse.input === "Create New Department") {
      addNewItemToDepartments();
    } else if (inquirerResponse.input === "EXIT") {
      console.log("Goodbye");
    }
  });

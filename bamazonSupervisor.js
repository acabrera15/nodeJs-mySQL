var inquirer = require('inquirer');
var mysql = require('mysql');

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
    console.log(inquirerResponse)

    if (inquirerResponse.input === "View Product Sales By Department") {

    } else if (inquirerResponse.input === "Create New Department") {

    } else if (inquirerResponse.input === "EXIT") {
        console.log('Goodbye')
    }
})

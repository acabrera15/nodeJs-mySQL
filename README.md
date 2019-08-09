# nodeJs-mySQL

This application is a CLI program that simulates a small program for a store.

This application uses node and mysql.  
The application is dependent the npm packages: mysql and inquirer.

The applicaion is broken up into a three different files.
* bamazonCustomer.js: This file will simulate a customer and will allow the user to "purchase items" from the available items.
    * The application will initially output a list of available items
    * then the user can input the item ID and the quantity they want to purchase
    * finally, the user will get a total and the mysql DB will be updated to reflect the change in inventory and the items sold
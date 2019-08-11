# nodeJs-mySQL

This application is a CLI program that simulates a small program for a store.

This application uses node and mysql.  
The application is dependent the npm packages: mysql and inquirer.

The applicaion is broken up into a three different files.
* bamazonCustomer.js: This file will simulate a customer and will allow the user to "purchase items" from the available items.
    * The application will initially output a list of available items
    * then the user can input the item ID and the quantity they want to purchase
    * finally, the user will get a total and the mysql DB will be updated to reflect the change in inventory and the items sold
    * application will loop until the user does not want to buy anything anymore
    ![](./Gifs/bamazonCustomerGif.gif)

* bamazonManager.js: This file will simulate a manger and will allow the user to view all products, view low inventory products, change invetory levels and add new items
    * The application will initially output a screen asking the user what they would like to do 
    * If view products for sale is selected, all products available will be output from the DB
    * If view low inventory is selected, all products with stock levels below 5 will be output
            ![](./Gifs/managerGif1.gif)

    * If add to inventory is selected, the user can change stock levels to a product and will be updated to the DB
            ![](./Gifs/managerGif2.gif)

    * if add new product is selected, user can input item they would like to add and item will be added to DB
            ![](./Gifs/managerGif3.gif)

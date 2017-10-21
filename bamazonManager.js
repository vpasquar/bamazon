// **************************************
// ** TABLE SCHEMA BELOW FOR REFERENCE **
//***************************************
// USE bamazon;

// CREATE TABLE products(
//   item_id INT NOT NULL AUTO_INCREMENT,
//   product_name VARCHAR(100) NOT NULL,
//   department_name VARCHAR(45) NOT NULL,
//   price INT default 0,
//   stock_quantity INT default 0,
//   PRIMARY KEY (item_id)
// );
// **************************************

//require necessary npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//connection information
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(err) {
      if (err) throw err;
//    console.log("connected as id " + connection.threadId);
});               
//connect to mysql server and database

function startView() {          
    inquirer.prompt([
       {
         name: "userSelect",
         type: "list",
         choices: ["View Products for Sale","View Low Inventory",
         "Add to Inventory","Add New Product"],
         message:"Select your Direction"
       }
    ]).then(function(resp) {
//   Master Control. Manager is presented with four options branching off to different sections of logic.    
       switch(resp.userSelect) {
         case "View Products for Sale":
            viewProducts();
            break;
         case "View Low Inventory":
            viewLowInvent();
            break;
         case "Add to Inventory":
            addInventory();
            break;
         case "Add New Product":
            addProduct();  
            break;       
       }
    });              
};


function restartView() {
    inquirer.prompt([
         {
            name: "userRestart",
            type: "list",
            choices: ["Return","Exit"],
            message: "Return to Main Menu?"
         }
      ]).then(function(resp) {

            if (resp.userRestart === "Return") {
                startView();
            } 
            else {
                 process.exit();
            }
      })
};

function viewProducts() {
	
    connection.query("Select * FROM products", function(err,results){
    	if (err) throw err;
    	var choiceArray = [];
    	var choiceId    = [];
    	for (var i = 0; i < results.length; i++) {
          choiceId.push(results[i].item_id);
    		  var id = results[i].item_id;
    		  var name = results[i].product_name;
    		  var price = results[i].price;
    		  // what the user will be given to choose from 
    		  var string = "Item Number: " + id + " Product: " + name + " Price: $" + price
          choiceArray.push(string);
    	}
          console.log("Product Selection:")
          console.log("------------------")		
          console.log(choiceArray);	 
          restartView();
    });  
};


function viewLowInvent() {
    connection.query("Select * FROM products WHERE stock_quantity < 20", function(err,results){
      if (err) throw err;
      var choiceArray = [];
      var choiceId    = [];
      for (var i = 0; i < results.length; i++) {
          choiceId.push(results[i].item_id);
          var id = results[i].item_id;
          var name = results[i].product_name;
          var price = results[i].price;
          var quant = results[i].stock_quantity;
          // what the user will be given to choose from 
          var string = "Item Number: " + id + " Product: " + name + " Price: $" + price + " Quantity Remaining: " + quant;
          choiceArray.push(string);
      }
          console.log("Product Selection:");
          console.log("Items with low stock remaining");
          console.log("------------------");   
          console.log(choiceArray);  
          restartView();
    }); 
};

function addInvent() {

};

function addProduct() {

};


startView();
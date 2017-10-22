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

//connect to mysql server and database
connection.connect(function(err) {
            if (err) throw err;
            //console.log("connected as id " + connection.threadId);   
            begin();               
});

function begin() {
	
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

         inquirer.prompt([
            {
	            name: "choice",
	            type: "list",
	            choices: ["1","2","3","4","5","6","7","8","9","10"],
	            message: "Which product would you like to purchase?"
            },
            {
	            name:"quantity",
	            type:"input",
	            message:"How many would you like to buy?"
            }   

        ])
        .then(function(resp) {

        	connection.query("SELECT stock_quantity, price FROM products WHERE ?",
        	  { item_id: parseInt(resp.choice) },
               function(err,res) {
		           if (err) throw err;
		        
	               if (res[0].stock_quantity < resp.quantity) {
                      console.log("Insufficient Stock Remaining");
	               }
	               else {
	               	    
	               	    var newQuant = parseInt(res[0].stock_quantity - resp.quantity);
	               	    console.log(newQuant);
	               	    connection.query(
                            "UPDATE products SET ? WHERE ?",
                             [
                               {
                               	stock_quantity: newQuant,
                                product_sales: (res[0].price * resp.quantity)
                               },
                               {
                               	item_id:resp.choice
                               }

                             ],
                             function(err) {
                             	if (err) throw err;
                             	console.log("Order Successfully placed")
                             	console.log("You Owe: " + res[0].price * resp.quantity);
                             	begin();
                             } 
    	               	)
	               };
               }

        	 );
    	    
        });

	});

    
};

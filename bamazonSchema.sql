DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES ("XBOX","Electronics",200,20),
       ("Television","Electronics",150,25),
       ("Cereal","Food",5,500),
       ("Toaster","Appliance",25,100),
       ("Microwave","Appliance",30,200),
       ("Refrigerator","Appliance",100,5),
       ("Dishwasher","Appliance",125,10),
       ("Coding Manual","Books",10,50),
       ("Catcher in the Rye","Books",8,50),
       ("The Circle","Books",10,10);
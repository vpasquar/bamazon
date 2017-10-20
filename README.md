# bamazon
CL interface (Node.js) using MySQL to create an Amazon like storefront


Functionality Screenshots:
[Screenshots](https://docs.google.com/document/d/14hPaohyDLcjh0z9e_VrXLkuoZulS1o8QTsMoVAn945c/edit?usp=sharing)

## MySQL Setup

In order to run this application, I hope you have MySql installed. If you don't, visit the MySQL installation page to install the version you need for your operating system. Once you have MySQL installed, create the Bamazon db by running the query found in bamazonSchema.sql. One this is completed you will be able to run the application as follows. 

## Customer Interface

The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is told that the item is out of stock.

To run the customer interface:

clone this repository
cd bamazon
npm install
node bamazon.js

## Supervisor View

Coming Soon...

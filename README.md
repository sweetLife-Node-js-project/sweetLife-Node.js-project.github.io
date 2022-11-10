
# SweetLife Bakery Node.js Project

## About the project: 


The project is designed as a bakery shop for different kind of sweets, facilitating the needs of browsing guest users, as well as logged in users.

The app is created by [Petar Anastasov](https://github.com/AnastasovP)

### Public part:
The guest users without authentication have access to the main dashboard in order to see the recipes of registered users, including: 

* the details of a recipe 
* received likes 

*If a guest user would like to be able to create a recipe, has access to the page with his own recipes, or like other users recipes he has to register.*

### Private part:

The logged in users have full access to everything in the application. They are awolled to: 
* share recipes with other users 
* delete or edit their own recipes
* and to like other registered users recipes - only one like per recipe.

### Technologies Used:

* Express as a Back-end framework
* MongoDB as a database with mongoose
* Express-Handlebars view engine
* Bcrypt for hashing the password
* CSS
* HTML
# Zicli-mockup-API
Zicli Assessment 


# Running on a local machine:

Edit the .env.sample as .env and specfy the necessary connection gotten form your postgres database
Run "npm run migrate" to create migrations
To undo migrations run "npm run undo-migrate"
then npm start will get you going on port 4444 !!!!!!!!!!!!


# Hosted API URL
http://zicli-mockup-api.herokuapp.com/api/v1

# API endpoints
POST /auth/signup  User/Admin Signup
POST /auth/signin    User/Admin Login

POST /products  Admin post product
GET /products   User/Admin see list of products

PATCH /products/:productId  Admin Update Product
DELETE /products/:productId Admin delete Product

POST /carts/:productId  User add item to their cart
DELETE /carts/:productId    Users can delete selected items from their carts

GET /carts  User can see items in their carts
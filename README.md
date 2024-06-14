# Airbean API

## Installation

To set up the project locally, follow these steps:
1. Clone the repository: `git clone`
2. Install dependencies: `npm install`
3. Create a `.env file`
4. Start the server: `npm run dev`

## API Endpoints

- Log in for Admin: (POST) `http://localhost:8000/api/login`
  - Don't forget to save token to get admin access
  - Authorization: Bearer YOUR_TOKEN
```
{
  "email": "admin@email.com",
  "password": "admin12345"
}
```

- Create Menu Item: (POST) `http://localhost:8000/api/admin/menu`
```
{
  "title":"Ice Americano",
  "description":"Ice Coffee",
  "price": "50"
}
```

- Update Menu Item: (PUT) `http://localhost:8000/api/admin/menu/:itemID` 
  - Use the id you got when creating the new menu item to update the menu.
```
{
  "title":"Ice Americano",
  "description":"Ice Coffee, changed the price",
  "price": "40"
}
```
- Response Example
```
{
  "status": "success",
  "message": "Updated item successfully",
  "data": {
    "_id": "666c9e40b03b6867ba4c2241",
    "title": "Ice Americano",
    "description": "Ice Coffee, changed the price",
    "price": 40,
    "createdAt": "2024-06-14T19:47:12.195Z",
    "modifiedAt": "2024-06-14T19:48:12.689Z",
    "__v": 0
  }
}
```

- Delete Menu Item: (DELETE) `http://localhost:8000/api/admin/menu/:itemID` 
  - Add the item id you want to delete.
  - Look for more id at menu: (GET) `http://localhost:8000/api/menu`

- Menu Promotion: (POST) `http://localhost:8000/api/admin/menu/promotion`
  - Create a promotion by adding two id.
```
{
  "item1Id": "666ca1a7b03b6867ba4c224d",
  "item2Id": "666ca1b0b03b6867ba4c2250"
}
```
- Response Example
```
{
  "status": "success",
  "message": "Promotion offer created successfully",
  "data": {
    "includedProducts": [
      "666ca1a7b03b6867ba4c224d",
      "666ca1b0b03b6867ba4c2250"
    ],
    "promotionalPrice": 66,
    "_id": "666ca23eb03b6867ba4c2262",
    "__v": 0
  }
}
```

- Create account: (POST) `https://localhost:8000/api/register`
- See Menu: (GET) `http://localhost:8000/api/menu`
- Create Order: (POST) `http://localhost:8000/api/order`
- See Order History: (GET) `http://localhost:8000/api/orderHistory/:id`
- See Delivery Status: (GET) `http://localhost:8000/api/deliveryStats/:orderID`
- Update Delivery Status: (GET) `http://localhost:8000/api/deliveryStats/:orderID/?:userID`
- About: (GET) `http://localhost:8000/api/about`

## Technologies Used
-   **Programming Language:** JavaScript
-   **Runtime Environment:** Node.js
-   **Web Framework:** Express.js
-   **Database:** MongoDB
-   **ODM (Object Data Modeling):** Mongoose
-   **Authentication:** JWT (JSON Web Tokens)
-   **Environment Variables:** dotenv
-   **Password Handling:** bcrypt
-   **Validation:** Validator
-   **Date and Time Management:** Moment.js, Moment Timezone
-   **Development Tools:** Nodemon
-   **CORS Handling:** CORS (Cross-Origin Resource Sharing)

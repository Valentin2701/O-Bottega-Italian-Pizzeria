# Ecommerce-shop

A modern, feature-rich e-commerce web application built with Angular and Node.js, designed to provide an intuitive shopping experience for users and a robust platform for sellers.

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT authentication.
- **Product Management**: Add, edit, and delete products with detailed information and images.
- **Cart Functionality**: Add products to the cart and proceed to checkout.
- **Search Products**: Search for products.
- **Lazy Loading**: Improved performance with lazy-loaded modules.
- **RESTful API**: Backed by a robust API built with Node.js and Express.
- **Database**: MongoDB for reliable data storage.

---

## 🛠️ Tech Stack

- **Frontend**: Angular, RxJS, HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS
- **Tools**: VSCode, Postman, Git

---

## 🏗️ Project Structure

```plaintext
src/
├── app/
│   ├── core/           # Core services, guards, interceptors
│   ├── features/       # Feature modules (Home, Products, Cart, etc.)
│   ├── shared/         # Shared components (Loader, Navbar, Footer)
│   ├── app-routing.module.ts # Centralized routing
│   └── app.component.ts      # Root component
├── assets/             # Static assets
└── environments/       # Environment-specific configurations
```

---

## 🔧 Installation and Setup

- **Prerequisites**: Node.js (v14 or higher), Angular CLI (v12 or higher), MongoDB (local)
- **Backend Setup**:
  1. Clone the repository: `git clone https://github.com/Valentin2701/Ecommerce-shop.git`
  2. Navigate to the backend directory: `cd Ecommerce-shop/server`
  3. Install dependencies: `npm install`
  4. Create an env folder with an env.js file in the backend directory:
     ```javascript
     export const SECRET = "dhey3u23784gfgrew8374g";
     export const PORT = 5000;
     export const DBURL = "mongodb://127.0.0.1:27017/ecommerce-shop";
     ```
  5. Start the backend server: `npm start`
- **Frontend Setup**:
  1. Navigate to the frontend directory: `cd Ecommerce-shop/client/ecommerce-shop`
  2. Install dependencies: `npm install`
  3. Start the development server: `ng serve`
  4. Open your browser and visit **http://localhost:4200**
## 📜 API Documentation
- **Base URL**: http://localhost:5000/api
  
### Endpoints:
**Authentication**:
- POST /register - Register a new user (Guest).
- POST /login - Login and receive a token (Guest).
- POST /logout - Logout and remove the token (User).
- GET /user - Get the current user (User).
  
**Products**:
- GET /products - Retrieve all products.
- GET /products/recent - Retrieve recent products.
- GET /products/:id - Retrieve a single product.
- POST /products - Add a new product (User).
- PUT /products/:id - Update a product (User).
- DELETE /products/:id - Delete a product (User).
- POST /products/buy - Buy products (User).
- POST /products/search - Search products.
  
**Cart**:
- POST /cart - Add items to the cart (User).
- GET /cart - Retrieve cart items (User).
- DELETE /cart/:id - Remove an item from the cart (User).

## 🛡️ License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

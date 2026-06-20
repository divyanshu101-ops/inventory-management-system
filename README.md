# Inventory Management System

A full-stack Inventory Management System built using **Node.js**, **Express.js**, **PostgreSQL**, **EJS**, **HTML**, and **CSS**.

This application helps manage products, categories, inventory stock, and inventory statistics through a clean dashboard interface. It also includes **session-based authentication**, allowing users to securely register, log in, and access protected routes.

---

## Features

### Authentication & Security

* User Registration
* User Login
* Password Hashing using bcrypt
* Session-based Authentication using express-session
* Protected Dashboard Routes
* Protected Product Routes
* Logout Functionality

### Dashboard

* View total number of products
* View total number of categories
* View low stock products
* View total inventory value

### Product Management

* View all products
* Add new products
* Edit existing products
* Delete products

### Database Features

* Relational database design
* Category-Product relationship using foreign keys
* Inventory value calculation
* Low stock monitoring

### UI Features

* Responsive navigation bar
* Dashboard cards
* Styled tables
* Styled forms
* Delete confirmation popup
* Responsive layout
* Modern authentication pages

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Authentication

* bcrypt
* express-session

### Database

* PostgreSQL

### Frontend

* EJS
* HTML
* CSS

### Version Control

* Git
* GitHub

---

## Database Schema

### Users Table

| Column        | Type                |
| ------------- | ------------------- |
| id            | SERIAL PRIMARY KEY  |
| username      | VARCHAR(100) UNIQUE |
| email         | VARCHAR(100) UNIQUE |
| password_hash | TEXT                |
| role          | VARCHAR(50)         |

### Categories Table

| Column      | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| name        | VARCHAR(100)       |
| description | TEXT               |

### Products Table

| Column      | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| name        | VARCHAR(100)       |
| description | TEXT               |
| price       | NUMERIC(10,2)      |
| stock       | INTEGER            |
| category_id | INTEGER            |
| created_at  | TIMESTAMP          |

---

## Authentication Flow

### Registration

1. User enters username, email, and password.
2. Password is validated.
3. Password is hashed using bcrypt.
4. User data is stored in PostgreSQL.
5. User is redirected to the login page.

### Login

1. User enters email and password.
2. User record is fetched from PostgreSQL.
3. bcrypt compares the password with the stored hash.
4. Session is created after successful authentication.
5. User is redirected to the dashboard.

### Logout

1. Active session is destroyed.
2. User is redirected to the login page.

---

## Project Structure

```text
Inventory_Management_System
│
├── config
│   └── db.js
│
├── public
│   ├── styles
│   │   ├── main.css
│   │   └── auth.css
│   │
│   └── js
│       ├── register.js
│       └── login.js
│
├── routes
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   └── productsRoutes.js
│
├── views
│   ├── register.ejs
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── products.ejs
│   ├── add-product.ejs
│   ├── edit-product.ejs
│   │
│   └── partials
│       └── navbar.ejs
│
├── .env
├── index.js
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/divyanshu101-ops/inventory-management-system.git
```

### Move Into Project Folder

```bash
cd inventory-management-system
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the project root.

```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=inventory_db
DB_PASSWORD=your_password
DB_PORT=5432

SESSION_SECRET=your_secret_key
```

### Start Server

```bash
npm start
```

or

```bash
nodemon index.js
```

---

## CRUD Operations Implemented

### Create

* Add Product
* Register User

### Read

* Dashboard
* Product Listing

### Update

* Edit Product

### Delete

* Delete Product

---

## Security Features

* Password hashing using bcrypt
* Session-based authentication
* Protected routes
* User login validation
* Duplicate email validation
* Duplicate username validation
* Strong password requirements

---

## Future Improvements

* Multi-user inventory management (user-specific products and categories)
* Role-Based Access Control (Admin / Employee)
* Product Search
* Pagination
* Product Details Page
* Forgot Password
* Google OAuth Login
* Redis Session Store
* Inventory Reports
* Product Image Upload

---

## Author

**Divyanshu Gautam**

B.Tech CSE Student | Aspiring Backend Developer

Focused on Backend Development, Databases, System Design, and Scalable Web Applications.

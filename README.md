# Inventory Management System

A full-stack Inventory Management System built using **Node.js**, **Express.js**, **PostgreSQL**, **EJS**, **HTML**, and **CSS**.

This application helps manage products, categories, inventory stock, and inventory statistics through a clean dashboard interface.

---

## Features

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

---

## Tech Stack

### Backend

* Node.js
* Express.js

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

## Project Structure

```text
Inventory_Management_System
│
├── config
│   └── db.js
│
├── public
│   └── styles
│       └── main.css
│
├── routes
│   ├── dashboardRoutes.js
│   └── productsRoutes.js
│
├── views
│   ├── dashboard.ejs
│   ├── products.ejs
│   ├── add-product.ejs
│   ├── edit-product.ejs
│   └── partials
│       └── navbar.ejs
│
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

### Read

* Dashboard
* Product Listing

### Update

* Edit Product

### Delete

* Delete Product

---

## Future Improvements

* Product Search
* Pagination
* Product Details Page
* Authentication & Authorization
* User Roles (Admin/Manager)
* Inventory Reports
* Product Image Upload

---

## Author

**Divyanshu Gautam**

B.Tech CSE Student | Aspiring Backend Developer

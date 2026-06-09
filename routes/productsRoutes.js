import express from "express";
import db  from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const infoAboutProduct = await db.query(`
            SELECT
                p.id,
                p.name,
                c.name AS category_name,
                p.price,
                p.stock
            FROM products p
            JOIN categories c
            ON p.category_id = c.id
            ORDER BY p.id;
        `);

        // console.log(infoAboutProduct.rows[0]);

        // res.send(infoAboutProduct.rows);
        res.render("products", {products : infoAboutProduct.rows});

    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/add", async (req, res) => {
    try {
        const categories = await db.query(`
            SELECT id, name FROM categories;
        `);

        res.render("add-product", {categories : categories.rows});

    } catch(err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/add",async (req, res)=> {
    try {
        const { name, description, price, stock, category_id } = req.body;
        const result = await db.query(
            `
            INSERT INTO products
            (name, description, price, stock, category_id)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [name, description, price, stock, category_id]
        );
        res.redirect("/products");
    } catch (error) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/edit/:id",async (req, res) => {
    const id = req.params.id;
    const toEdit = await db.query(`
        SELECT * FROM products Where id = $1
        `, [id]);
    
    const categoriesResult = await db.query(`SELECT id, name FROM categories`);    
    

    res.render("edit-product", {
        product : toEdit.rows[0],
        categories: categoriesResult.rows
    });
});

router.post("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const {
            name,
            description,
            price,
            stock,
            category_id
        } = req.body;

        await db.query(
            `
            UPDATE products
            SET
                name = $1,
                description = $2,
                price = $3,
                stock = $4,
                category_id = $5
            WHERE id = $6
            `,
            [
                name,
                description,
                price,
                stock,
                category_id,
                id
            ]
        );

        res.redirect("/products");

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.query(
            "DELETE FROM products WHERE id = $1",
            [id]
        );
        res.redirect("/products");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
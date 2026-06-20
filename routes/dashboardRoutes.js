import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    try {
        const productResult = await db.query(
            "SELECT COUNT(*) FROM products"
        );

        const categoriesResult = await db.query(
            "SELECT COUNT(*) FROM categories"
        );

        const lowStockResult = await db.query(`
            SELECT
                p.*,
                c.name AS category_name
            FROM products p
            JOIN categories c
            ON p.category_id = c.id
            WHERE p.stock < 10
        `);

        const inventoryValueResult = await db.query(
            "SELECT SUM(price * stock) FROM products"
        );

        res.render("dashboard", {
            totalProducts: productResult.rows[0].count,
            totalCategories: categoriesResult.rows[0].count,
            totalInventoryValue: inventoryValueResult.rows[0].sum,
            lowStockProducts: lowStockResult.rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
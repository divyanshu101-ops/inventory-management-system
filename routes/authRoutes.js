import express from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const router = express.Router();

router.get("/register", (req, res) => {
    res.render("register", {
        error: null,
        values: { username: "", email: "", password: "" }
    });
});

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.render("register", {
                error: "All fields are required.",
                values: { username, email, password }
            });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.render("register", {
                error: "Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character.",
                values: { username, email, password }
            });
        }

        const existingUser = await db.query(
            `SELECT * FROM users WHERE username = $1 OR email = $2`,
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.render("register", {
                error: "Username or Email already exists.",
                values: { username, email, password }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, 'employee')`,
            [username, email, hashedPassword]
        );

        res.redirect("/login");

    } catch (err) {
        console.error(err);
        res.render("register", {
            error: "Something went wrong. Please try again.",
            values: { username: "", email: "", password: "" }
        });
    }
});

export default router;
import express from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const router = express.Router();

// Register Routes

router.get("/register", (req, res) => {
    res.render("register", {
        error: null,
        values: { username: "", email: "" }
    });
});

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.render("register", {
                error: "All fields are required.",
                values: { username, email}
            });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.render("register", {
                error: "Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character.",
                values: { username, email }
            });
        }

        const existingUser = await db.query(
            `SELECT * FROM users WHERE username = $1 OR email = $2`,
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.render("register", {
                error: "Username or Email already exists.",
                values: { username, email }
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
            values: { username: "", email: "" }
        });
    }
});

// Login Routes
router.get("/login", (req, res)=>{
    res.render("login", {
        error: null,
        values: {email : ""}
    });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.render("login", {
                error: "All fields are required",
                values: { email }
            });
        }

        const result = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if(result.rows.length === 0){
            return res.render("login", {
                error: "Invalid email or password.",
                values: {email}
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
            password, 
            user.password_hash
        );

        if(!isMatch){
            return res.render("login", {
                error: "Invalid email or password",
                values: {email}
            });
        }

        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.role = user.role;

        console.log(req.session);

        res.redirect("/");

    } catch (err) {
        console.log(err);

        return res.render("login", {
            error: "Something went wrong. Please try again",
            values: {email: ""}
        });
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.redirect("/dashboard");
        }
        res.redirect("/login");
    });
});
export default router;
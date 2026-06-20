import express from "express";
import bodyParser from "body-parser";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {

    if (req.session.userId) {
        return res.redirect("/dashboard");
    }

    return res.redirect("/login");
});

app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/products", productsRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
import express from "express";
import bodyParser from "body-parser";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", dashboardRoutes);
app.use("/products", productsRoutes);
app.use("/", authRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
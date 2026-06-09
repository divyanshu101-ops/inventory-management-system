import express from "express";
import bodyParser from "body-parser";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", dashboardRoutes);
app.use("/products", productsRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
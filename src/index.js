require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConnection = require("./database/mongodb");

dbConnection();

app.use(cors()); // para que cualquier host pueda conectar a mi api
app.use(express.json()); // para que mi api pueda leer informacion del body (POST y PUT)

app.get("/", (req, res) => {
    return res.json({
      ok: true,
      msg: "Welcome to API ACME",
      author: "Janis",
    });
  });

  app.use("/users", require("./routes/users.routes"));
  app.use("/auth", require("./routes/auth.routes"));
  app.use("/products", require("./routes/products.routes"));

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
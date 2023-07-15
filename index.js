const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./src/config/database");

app.use(express.json());
app.use(cookieParser());
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
const product = require("./src/routes/product.routes");
const user = require("./src/routes/user.routes");
const order = require("./src/routes/order.routes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

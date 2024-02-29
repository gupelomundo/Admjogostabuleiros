const express = require("express");
const cors = require("cors");
// const router = require("./src/routes/product");
const { gameRouter, userRouter, orderRouter } = require("./src/routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/game", gameRouter);
app.use("/order", orderRouter);
app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});

const express = require("express");
const cors = require("cors");
const { productsRouter, usersRouter, salesRouter } = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/sales", salesRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middleware/corsMiddleware");
const ecommerceRouter = require("./routes/ecommerceRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsMiddleware);
app.use(bodyParser.json());
app.use("/api/ecommerce", ecommerceRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

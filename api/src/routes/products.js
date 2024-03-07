const express = require("express");
const productsController = require("../controllers/products");

const router = express.Router();

router.get("/list", productsController.list);
router.get("/filter", productsController.filter);

module.exports = router;

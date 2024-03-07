const express = require("express");
const salesController = require("../controllers/sales");

const router = express.Router();

router.get("/list", salesController.list);
router.post("/create", salesController.create);

module.exports = router;

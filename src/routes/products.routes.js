const { Router } = require("express");
const { getProducts, getProduct } = require("../controllers/products.controllers");

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

module.exports = router;
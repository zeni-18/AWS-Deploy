const express = require("express");
const { getProduct, postProduct, deleteProduct, updateProduct } = require("../controller/productController");

const router = express.Router();
const auth = require('../middleware/auth');

router.get("/getproduct", getProduct);
router.post("/postProduct", auth, postProduct)
router.delete("/deleteProduct/:id", auth, deleteProduct)
router.put("/updateProduct/:id", auth, updateProduct)
module.exports = router;

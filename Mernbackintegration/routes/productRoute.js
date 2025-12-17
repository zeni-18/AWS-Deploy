const express = require("express");
const { getProduct, postProduct, deleteProduct, updateProduct } = require("../controller/productController");

const router = express.Router();

router.get("/getproduct", getProduct);
router.post("/postProduct",postProduct)
router.delete("/deleteProduct/:id",deleteProduct)
router.put("/updateProduct/:id",updateProduct)
module.exports = router;

const express = require("express");
const { create, showallexpense, deleteexpense,updateexpense } = require("../controllers/expenseController");
const { protect } = require("../middleware/protectHandler");
const router = express.Router();
router.post("/", protect, create);
router.get("/", protect, showallexpense);
router.delete("/:id",protect,deleteexpense);
router.put("/:id",protect,updateexpense);
module.exports = router;

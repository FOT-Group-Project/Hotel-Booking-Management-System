const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/google", authController.google);
router.post("/signout", authController.signOut);

module.exports = router;

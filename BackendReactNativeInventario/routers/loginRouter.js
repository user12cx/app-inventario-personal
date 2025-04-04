const express = require("express");
const { login, validateLogin } = require("../modules/login/loginController");
const { register, validateRegister, } = require("../modules/login/registerController");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);

module.exports = router;

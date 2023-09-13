const express = require("express");
const router = express.Router();
const application = require("../controller/application");

router.post("/signup", application.signup);
router.post("/login", application.login);
router.post("/forgotpassword", application.forgotPassword);
router.post("/resetpassword", application.resetPassword);

module.exports = router;

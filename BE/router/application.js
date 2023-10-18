const express = require("express");
const router = express.Router();
const application = require("../controller/application");
const auth = require("../auth/middleware");

router.post("/signup", application.signup);
router.post("/login", application.login);
router.post("/forgotpassword", application.forgotPassword);
router.post("/resetpassword", application.resetPassword);
router.post("/add/project", auth, application.postProject);
router.get("/all/project", application.getAllProjects);
router.post("/send/otp", application.sendOtp);
router.get("/user-details", auth, application.getUserDetails);

module.exports = router;

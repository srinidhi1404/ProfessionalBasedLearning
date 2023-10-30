const express = require("express");
const router = express.Router();
const application = require("../controller/application");
const auth = require("../auth/middleware");

router.post("/signup", application.signup);
router.post("/login", application.login);
router.post("/forgotpassword", application.forgotPassword);
router.post("/resetpassword", application.resetPassword);
router.post("/add/project", auth, application.postProject);
router.get("/all/project", auth, application.getAllProjects);
router.post("/send/otp", application.sendOtp);
router.get("/user-details", auth, application.getUserDetails);
router.post("/add/comment", auth, application.postComment);
router.post("/add/sub-comment", auth, application.postSubComment);
router.post("/flag/comment", auth, application.flagComment);
router.post("/flag/sub-comment", auth, application.flagSubComment);
router.post("/add/image", auth, application.uploadImage);
router.post("/post/request", application.postRequest);
router.get("/get/request", auth, application.getRequst);
router.post("/flag/user", auth, application.flagUser);
router.post("/user/project", auth, application.getSingleUserProject);
router.post("/update/request", auth, application.updateRequestStatus);
router.post("/flag/project", auth, application.flagProject);
router.post("/disable/project", auth, application.disableProject);

module.exports = router;

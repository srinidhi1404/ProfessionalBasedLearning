const express = require("express");
const router = express.Router();
const admin = require("../controller/admin");
const auth = require("../auth/middleware");

router.post("/signup", admin.signup);
router.post("/login", admin.login);
router.get("/all/project", auth, admin.getAllProjects);
router.post("/approve", admin.updateProjectStatus);
router.post("/disable/comment", auth, admin.disableComment);
router.post("/disable/sub-comment", auth, admin.disableSubComment);
router.get("/all/comments", auth, admin.getAllComments);
router.get("/flag-user", auth, admin.getUsersWithFlag);
router.post("/disable/user", auth, admin.disableUser);
router.get("/all/user", auth, admin.getAllUsers);

module.exports = router;

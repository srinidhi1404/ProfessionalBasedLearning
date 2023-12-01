const express = require("express");
const router = express.Router();
const student = require("../controller/student");
const auth = require("../auth/middleware");

router.post("/signup", student.signup);
router.post("/login", student.login);
router.get("/all", student.getAllStudents);
router.get("/all/project", auth, student.getAllProjects);
router.post("/add/project", auth, student.postProject);
router.get("/student-details", auth, student.getStudentDetails);
router.post("/add/comment", auth, student.postComment);
router.post("/add/sub-comment", auth, student.postSubComment);
router.post("/add/image", auth, student.uploadImage);
router.get("/get/request", auth, student.getRequst);
router.post("/edit/project", auth, student.editProject);
router.post("/delete/project", auth, student.deleteProject);

module.exports = router;

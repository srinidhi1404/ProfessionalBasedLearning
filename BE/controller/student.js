const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const pool = require("../pool");
const config = require("../config");
const bookidgen = require("bookidgen");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const sqlQuery = "SELECT * FROM student WHERE email = ?";
      const [results] = await pool.execute(sqlQuery, [email]);

      if (results.length === 0) {
        res.json({ message: "Student does not exist", status: false });
      } else {
        const userData = results[0];
        if (userData.disable) {
<<<<<<< HEAD
<<<<<<< HEAD
          res.json({
            message: "You have been blocked by the Admin",
            status: false,
          });
=======
          res.json({ message: "Student is disabled", status: false });
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
=======
          res.json({ message: "Student is disabled", status: false });
>>>>>>> eedf378f112d238e6d6a29b02d63a4f8af80e961
          return; // Exit the function if the student is disabled
        }
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (passwordMatch) {
          const token = jwt.sign(
            {
              id: userData.email,
              firstName: userData.firstName,
              secondName: userData.secondName,
            },
            config.JWT_TOKEN_KEY
          );
          res.json({
            message: "Login successful",
            token: token,
            status: true,
          });
        } else {
          res.json({
            message: "Invalid username/password",
            status: false,
          });
        }
      }
    }
  } catch (err) {
    res.json({ message: err.message, status: false });
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, secondName, email, password } = req.body;

    if (!firstName || !secondName || !email || !password) {
      res.json({ message: "Enter all data", status: false });
      return;
    }
    const checkEmailQuery = "SELECT * FROM student WHERE email = ?";
    const [existingUser] = await pool.query(checkEmailQuery, [email]);
    if (existingUser.length > 0) {
      res.json({ message: "Student already exists", status: false });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertQuery =
      "INSERT INTO student (firstName, secondName, email, password) VALUES (?, ?, ?, ?)";
    await pool.query(insertQuery, [
      firstName,
      secondName,
      email,
      hashedPassword,
    ]);
    res
      .status(201)
      .json({ message: "Student signed up successfully", status: true });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "An error occurred while signing up", status: false });
  }
};

const getAllStudents = async (req, res) => {
  try {
    // Retrieve all students from the database
    const getAllStudentsQuery = "SELECT * FROM student";
    const [students] = await pool.query(getAllStudentsQuery);

    res.status(200).json({ students, status: true });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching students",
      status: false,
    });
  }
};
const postProject = async (req, res) => {
  try {
    const {
      projectTitle,
      projectDescription,
      startDate,
      endDate,
      contactNumber,
      projectSummary,
      projectType,
      document,
      keywords, // Add keywords to the request body
    } = req.body;
    // Check if all mandatory fields are provided
    if (
      !projectTitle ||
      !startDate ||
      !endDate ||
      !contactNumber ||
      !projectSummary ||
      projectType === undefined ||
      !document ||
      !keywords
    ) {
      res.json({
        message: "All mandatory fields must be provided",
        status: false,
      });
    } else {
      console.log(req.data);
      const email = req.data.id;
      const firstName = req.data.firstName;
      const secondName = req.data.secondName;
      const projectId = bookidgen("STD-", 14522, 199585);
      const imageQuery = "SELECT id, image FROM student WHERE email = ?";
      const [image] = await pool.query(imageQuery, [email]);
      const profileImage = image[0].image;
      const userId = image[0].id;
      const insertQuery =
        "INSERT INTO studentProject (projectTitle, projectId, email, projectDescription, startDate, endDate, contactNumber, projectSummary, projectType, document, firstName, secondName, image, userId, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      await pool.query(insertQuery, [
        projectTitle,
        projectId,
        email,
        projectDescription,
        startDate,
        endDate,
        contactNumber,
        projectSummary,
        projectType,
        document,
        firstName,
        secondName,
        profileImage,
        userId,
        JSON.stringify(keywords), // Store keywords as JSON string
      ]);

      res
        .status(201)
        .json({ message: "Project posted successfully", status: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    const email = req.data.id;
    const { image } = req.body;
    if (!image) {
      res.json({ message: "No image data provided", status: false });
      return;
    }
    const checkStudentQuery = "SELECT * FROM student WHERE email = ?";
    const [existingStudent] = await pool.query(checkStudentQuery, [email]);
    if (existingStudent.length === 0) {
      res.json({ message: "Student does not exist", status: false });
      return;
    }
    const updateImageQuery = "UPDATE student SET image = ? WHERE email = ?";
    await pool.query(updateImageQuery, [image, email]);
    const updateProjectsImageQuery = `
    UPDATE studentProject
    SET image = ?
    WHERE email = ?
    `;
    const [result] = await pool.query(updateProjectsImageQuery, [image, email]);
    console.log(result);
    res.json({ message: "Image updated successfully", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "An error occurred during image upload",
      status: false,
    });
  }
};

function getCommentsByProjectId(comments, projectId) {
  return comments.filter((comment) => comment.projectId === projectId);
}
const getAllProjects = async (req, res) => {
  try {
    const email = req.data.id;
    const selectQuery = `
    SELECT * FROM studentProject
    WHERE (projectType = 1 OR (projectType = 0 AND email = ?))
      AND (endDate IS NULL OR endDate >= CURDATE())
  `;
    const [projects] = await pool.query(selectQuery, [email]);
    const studentQuery = `
    SELECT * FROM projects
    WHERE projectType = 1
  `;
    const [studentProjects] = await pool.query(studentQuery, [email]);

    let data = projects.concat(studentProjects);
    const query = `
    SELECT
      c.id AS commentId,
      c.text AS commentText,
      c.createdAt AS createdAt,
      c.flag AS flag,
      c.disable AS disable,
      c.projectId AS projectId,
      c.firstName As firstName,
      c.secondName As secondName,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', sc.id,
          'text', sc.text,
          'createdAt', sc.createdAt,
          'flag', sc.flag,
          'disable', sc.disable,
          'firstName', sc.firstName,
          'secondName', sc.secondName
        )
      ) AS subComments
    FROM
      comments c
    LEFT JOIN
      subComments sc
    ON c.id = sc.commentId
    GROUP BY
      c.id
    ORDER BY
      c.createdAt DESC
    LIMIT 0, 25
  `;
    const [comments] = await pool.query(query, [email]);
    console.log(comments);
    data.forEach((element) => {
      element.comment = getCommentsByProjectId(comments, element.projectId);
    });
    res.status(200).json({ data: data, status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "An error occurred while fetching projects",
      status: false,
    });
  }
};

const getStudentDetails = async (req, res) => {
  try {
    const email = req.data.id;

    const userQuery =
      "SELECT id,firstName,secondName,email, image FROM student WHERE email = ?";
    const [userResult] = await pool.query(userQuery, [email]);

    if (userResult.length === 0) {
      return res
        .status(404)
        .json({ message: "Student not found", status: false });
    }

    const user = userResult[0];

    const projectsQuery = "SELECT * FROM studentProject WHERE email = ?";
    const [projectsResult] = await pool.query(projectsQuery, [email]);

    const response = {
      user,
      projects: projectsResult,
    };

    res
      .status(200)
      .json({ data: response, message: "student details found", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching student details and projects",
      status: false,
    });
  }
};

const postComment = async (req, res) => {
  try {
    const { text, projectId } = req.body;
    if (!text || !projectId) {
      return res.json({ message: "All fields are required", status: false });
    }
    let firstName, secondName;
    const userEmail = req.data.id;
    const [userRows] = await pool.execute(
      "SELECT firstName, secondName FROM student WHERE email = ?",
      [userEmail]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    firstName = userRows[0].firstName;
    secondName = userRows[0].secondName;
    const insertQuery = `
      INSERT INTO comments (firstName, secondName, text, projectId)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(insertQuery, [firstName, secondName, text, projectId]);
    res
      .status(201)
      .json({ message: "Comment added successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the comment",
      status: false,
    });
  }
};
const postSubComment = async (req, res) => {
  try {
    const { text, commentId } = req.body;
    if (!text || !commentId) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: false });
    }
    let firstName, secondName;
    const userEmail = req.data.id;
    const [userRows] = await pool.execute(
      "SELECT firstName, secondName FROM student WHERE email = ?",
      [userEmail]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found.", status: false });
    }
    firstName = userRows[0].firstName;
    secondName = userRows[0].secondName;
    const insertQuery = `
      INSERT INTO subComments (firstName, secondName, text, commentId)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(insertQuery, [firstName, secondName, text, commentId]);
    res
      .status(201)
      .json({ message: "Sub-comment added successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the sub-comment",
      status: false,
    });
  }
};
const getRequst = async (req, res) => {
  try {
    const email = req.data.id;
    console.log(email);
    const selectQuery = `
      SELECT * FROM request WHERE projectEmail = ?
    `;
    const [result] = await pool.query(selectQuery, [email]);
    console.log(result);
    res.status(200).json({
      data: result,
      message: "Requests retrieved successfully",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching requests",
      status: false,
    });
  }
};

function checkMissingFields(requiredFields, data) {
  const missingFields = [];
  requiredFields.forEach((field) => {
    if (data[field] === undefined || data[field] === null) {
      missingFields.push(field);
    }
  });
  return missingFields;
}
const editProject = async (req, res) => {
  try {
    const requiredFields = [
      "projectId",
      "projectTitle",
      "projectDescription",
      "startDate",
      "endDate",
      "contactNumber",
      "projectSummary",
      "projectType",
      "document",
      "keywords",
    ];

    const missingFields = checkMissingFields(requiredFields, req.body);

    if (missingFields.length > 0) {
      res.json({
        message: `The following fields are missing: ${missingFields.join(
          ", "
        )}`,
        status: false,
      });
      return;
    }

    const {
      projectId,
      projectTitle,
      projectDescription,
      startDate,
      endDate,
      contactNumber,
      projectSummary,
      projectType,
      document,
      keywords,
    } = req.body;

    const email = req.data.id;
    const firstName = req.data.firstName;
    const secondName = req.data.secondName;

    // Check if the project exists before proceeding with the update
    const projectExistQuery = `
      SELECT projectId FROM studentProject 
      WHERE projectId = ? AND email = ?`;

    const [existingProject] = await pool.query(projectExistQuery, [
      projectId,
      email,
    ]);

    if (existingProject.length === 0) {
      res.json({
        message: "Project does not exist.",
        status: false,
      });
      return;
    }

    // Update the project in the database
    const updateQuery = `
      UPDATE studentProject 
      SET projectTitle = ?, projectDescription = ?, startDate = ?, endDate = ?, 
          contactNumber = ?, projectSummary = ?, projectType = ?, 
          document = ?, keywords = ?, firstName = ?, secondName = ?
      WHERE projectId = ? AND email = ?`;

    await pool.query(updateQuery, [
      projectTitle,
      projectDescription,
      startDate,
      endDate,
      contactNumber,
      projectSummary,
      projectType,
      document,
      JSON.stringify(keywords),
      firstName,
      secondName,
      projectId,
      email,
    ]);

    res.json({ message: "Project updated successfully", status: true });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    // Check if the 'projectId' is provided in the request body
    if (!projectId) {
      res.json({
        message:
          "projectId is mandatory and must be provided in the request body",
        status: false,
      });
      return;
    }

    const email = req.data.id;

    // Delete the project from the database
    const deleteQuery =
      "DELETE FROM studentProject WHERE projectId = ? AND email = ?";

    await pool.query(deleteQuery, [projectId, email]);

    res.json({ message: "Project deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = {
  signup,
  login,
  getAllStudents,
  postProject,
  getAllProjects,
  getStudentDetails,
  postComment,
  postSubComment,
  uploadImage,
  getRequst,
  editProject,
  deleteProject,
};

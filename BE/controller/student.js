const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const pool = require("../pool");
const config = require("../config");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const sqlQuery = "SELECT * FROM student WHERE email = ?";
      const [results] = await pool.execute(sqlQuery, [email]);

      if (results.length === 0) {
        res.json({ message: "student does not exist", status: false });
      } else {
        const userData = results[0];

        if (userData.password === password) {
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

    // Check if any required field is missing
    if (!firstName || !secondName || !email || !password) {
      res.json({ message: "Enter all data", status: false });
      return;
    }

    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM student WHERE email = ?";
    const [existingUser] = await pool.query(checkEmailQuery, [email]);
    if (existingUser.length > 0) {
      res.json({ message: "Student already exists", status: false });
      return;
    }

    // Insert the new student
    const insertQuery =
      "INSERT INTO student (firstName, secondName, email, password) VALUES (?, ?, ?, ?)";
    await pool.query(insertQuery, [firstName, secondName, email, password]);

    res
      .status(201)
      .json({ message: "Student signed up successfully", status: true });
  } catch (error) {
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
    } = req.body;

    // Check if all mandatory fields are provided
    if (
      !projectTitle ||
      !startDate ||
      !endDate ||
      !contactNumber ||
      !projectSummary ||
      projectType === undefined ||
      !document
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
      const insertQuery =
        "INSERT INTO studentProject (projectTitle,email, projectDescription, startDate, endDate, contactNumber, projectSummary, projectType, document, firstName, secondName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

      await pool.query(insertQuery, [
        projectTitle,
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
      ]);

      res
        .status(201)
        .json({ message: "Project posted successfully", status: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while posting the project",
      status: false,
    });
  }
};

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
    console.log(data.length);
    res.status(200).json({ data: data, status: true });
  } catch (error) {
    console.log(error);
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
      "SELECT id,firstName,secondName,email FROM student WHERE email = ?";
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

module.exports = {
  signup,
  login,
  getAllStudents,
  postProject,
  getAllProjects,
  getStudentDetails,
};

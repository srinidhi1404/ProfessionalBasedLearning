const jwt = require("jsonwebtoken");
const pool = require("../pool");
const config = require("../config");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ message: "Enter all data", status: false });
    } else {
      const sqlQuery = "SELECT * FROM admin WHERE email = ?";
      const [results] = await pool.execute(sqlQuery, [email]);

      if (results.length === 0) {
        res.json({
          message: "admin does not exist, Please Signup",
          status: false,
        });
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
    const checkEmailQuery = "SELECT * FROM admin WHERE email = ?";
    const [existingUser] = await pool.query(checkEmailQuery, [email]);
    if (existingUser.length > 0) {
      res.json({ message: "Admin already exists", status: false });
      return;
    }

    // Insert the new student
    const insertQuery =
      "INSERT INTO admin (firstName, secondName, email, password) VALUES (?, ?, ?, ?)";
    await pool.query(insertQuery, [firstName, secondName, email, password]);

    res
      .status(201)
      .json({ message: "admin signed up successfully", status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while signing up", status: false });
  }
};
function getCommentsByProjectId(comments, projectId) {
  return comments.filter((comment) => comment.projectId === projectId);
}
const getAllProjects = async (req, res) => {
  try {
    const email = req.data.id;
    const selectQuery = `
    SELECT * FROM projects`;
    const [projects] = await pool.query(selectQuery);
    const studentQuery = `
    SELECT * FROM studentProject`;
    const [studentProjects] = await pool.query(studentQuery);

    let data = projects.concat(studentProjects);
    const query = `
    SELECT
      c.id AS commentId,
      c.text AS commentText,
      c.createdAt AS createdAt,
      c.flag AS flag,
      c.disable AS disable,
      c.projectId AS projectId,
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

    const [comments] = await pool.query(query);
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
const exploreProjects = async (req, res) => {
  try {
    const email = req.data.id;
    const selectQuery = `
    SELECT * FROM projects
    WHERE projectType = 1`;
    const [projects] = await pool.query(selectQuery);
    const studentQuery = `
    SELECT * FROM studentProject
    WHERE projectType = 1
  `;
    const [studentProjects] = await pool.query(studentQuery);

    let data = projects.concat(studentProjects);
    const query = `
    SELECT
      c.id AS commentId,
      c.text AS commentText,
      c.createdAt AS createdAt,
      c.flag AS flag,
      c.disable AS disable,
      c.projectId AS projectId,
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

    const [comments] = await pool.query(query);
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
const updateProjectStatus = async (req, res) => {
  try {
    const { projectId, status } = req.body;
    if (!projectId || !status) {
      res.status(400).json({
        message: "Project ID and status are required",
        status: false,
      });
      return;
    }
    const checkProjectQuery = `
      SELECT * FROM projects
      WHERE projectId = ?`;
    const [projects] = await pool.query(checkProjectQuery, [projectId]);
    if (projects.length > 0) {
      const updateProjectQuery = `
        UPDATE projects
        SET status = ?
        WHERE projectId = ?`;
      await pool.query(updateProjectQuery, [status, projectId]);
    } else {
      const checkStudentProjectQuery = `
        SELECT * FROM studentProject
        WHERE projectId = ?`;
      const [studentProjects] = await pool.query(checkStudentProjectQuery, [
        projectId,
      ]);

      if (studentProjects.length > 0) {
        const updateStudentProjectQuery = `
          UPDATE studentProject
          SET status = ?
          WHERE projectId = ?`;
        await pool.query(updateStudentProjectQuery, [status, projectId]);
      } else {
        res.status(404).json({
          message: "Project not found",
          status: false,
        });
        return;
      }
    }

    res.status(200).json({
      message: "Project status updated successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating project status",
      status: false,
    });
  }
};
const disableComment = async (req, res) => {
  const { commentId, disable } = req.body;
  if (disable === undefined) {
    return res
      .status(400)
      .json({ message: "Disable value is required", status: false });
  }
  if (typeof disable !== "boolean") {
    return res
      .status(400)
      .json({ message: "Disable value must be a boolean", status: false });
  }
  if (!commentId) {
    return res
      .status(400)
      .json({ message: "Comment ID is required", status: false });
  }
  try {
    const selectQuery = "SELECT disable FROM comments WHERE id = ?";
    const [rows] = await pool.query(selectQuery, [commentId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Comment not found", status: false });
    }
    const existingDisableStatus = rows[0].disable;
    if (existingDisableStatus == disable) {
      const action = disable ? "disabled" : "enabled";
      return res
        .status(200)
        .json({ message: `Comment is already ${action}`, status: true });
    }
    const updateQuery = "UPDATE comments SET disable = ? WHERE id = ?";
    await pool.query(updateQuery, [disable, commentId]);
    const action = disable ? "disabled" : "enabled";
    res
      .status(200)
      .json({ message: `Comment ${action} successfully`, status: true });
  } catch (error) {
    console.error("Error toggling comment status:", error);
    res.status(500).json({
      message: "An error occurred while toggling the comment status",
      status: false,
    });
  }
};
const disableSubComment = async (req, res) => {
  const { commentId, disable } = req.body;
  if (disable === undefined) {
    return res
      .status(400)
      .json({ message: "Disable value is required", status: false });
  }
  if (typeof disable !== "boolean") {
    return res
      .status(400)
      .json({ message: "Disable value must be a boolean", status: false });
  }
  if (!commentId) {
    return res
      .status(400)
      .json({ message: "Comment ID is required", status: false });
  }
  try {
    const selectQuery = "SELECT disable FROM subComments WHERE id = ?";
    const [rows] = await pool.query(selectQuery, [commentId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Comment not found", status: false });
    }
    const existingDisableStatus = rows[0].disable;
    console.log(existingDisableStatus);
    if (existingDisableStatus == disable) {
      const action = disable ? "disabled" : "enabled";
      return res
        .status(200)
        .json({ message: `Comment is already ${action}`, status: true });
    }
    const updateQuery = "UPDATE subComments SET disable = ? WHERE id = ?";
    await pool.query(updateQuery, [disable, commentId]);
    const action = disable ? "disabled" : "enabled";
    res
      .status(200)
      .json({ message: `Comment ${action} successfully`, status: true });
  } catch (error) {
    console.error("Error toggling comment status:", error);
    res.status(500).json({
      message: "An error occurred while toggling the comment status",
      status: false,
    });
  }
};
const getAllComments = async (req, res) => {
  try {
    const commentQuery = "SELECT * FROM comments";
    const [comments] = await pool.query(commentQuery);
    const subCommentQuery = "SELECT * FROM subComments";
    const [subComments] = await pool.query(subCommentQuery);
    const data = {};
    data.comments = comments;
    data.subComments = subComments;
    res.status(200).json({ data: data, status: true });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching comments",
      status: false,
    });
  }
};

const disableUser = async (req, res) => {
  try {
    const { userId, email, disable } = req.body;
    const checkUserQuery = "SELECT * FROM user WHERE id = ? AND email = ?";
    const [existingUser] = await pool.query(checkUserQuery, [userId, email]);
    if (existingUser.length > 0) {
      const updateUserQuery =
        "UPDATE user SET disable = ? WHERE id = ? AND email = ?";
      await pool.query(updateUserQuery, [disable, userId, email]);
    } else {
      const checkStudentQuery =
        "SELECT * FROM student WHERE id = ? AND email = ?";
      const [existingStudent] = await pool.query(checkStudentQuery, [
        userId,
        email,
      ]);
      if (existingStudent.length > 0) {
        const updateStudentQuery =
          "UPDATE student SET disable = ? WHERE id = ? AND email = ?";
        await pool.query(updateStudentQuery, [disable, userId, email]);
      } else {
        return res
          .status(404)
          .json({ message: "User or student not found", status: false });
      }
    }
    return res
      .status(200)
      .json({ message: "User or student disabled successfully", status: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

const getUsersWithFlag = async (req, res) => {
  try {
    const userQuery =
      "SELECT id,firstName,secondName,email,image,flag,disable FROM user WHERE flag = true";
    const [usersFromUserTable] = await pool.query(userQuery);
    // Fetch users from the "student" table where flag flag is true
    const studentQuery =
      "SELECT id,firstName,secondName,email,image,flag,disable FROM student WHERE flag = true";
    const [usersFromStudentTable] = await pool.query(studentQuery);
    // Concatenate the users from both tables
    const allUsers = [...usersFromUserTable, ...usersFromStudentTable];
    return res.status(200).json({ users: allUsers, status: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const selectUserQuery = `
      SELECT id, email, firstName, secondName, image, flag, disable
      FROM user
    `;
    const [users] = await pool.query(selectUserQuery);

    const selectStudentQuery = `
      SELECT id, email, firstName, secondName, image, flag, disable
      FROM student
    `;
    const [students] = await pool.query(selectStudentQuery);

    const data = users.concat(students);

    res.status(200).json({ data, status: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "An error occurred while fetching users",
      status: false,
    });
  }
};

module.exports = {
  signup,
  login,
  getAllProjects,
  updateProjectStatus,
  disableComment,
  disableSubComment,
  getAllComments,
  getUsersWithFlag,
  disableUser,
  getAllUsers,
  exploreProjects,
};

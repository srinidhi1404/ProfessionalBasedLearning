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
      const sqlQuery = "SELECT * FROM user WHERE email = ?";
      const [results] = await pool.execute(sqlQuery, [email]);
      if (results.length === 0) {
        res.json({ msg: "User does not exist" });
      } else {
        const userData = results[0];
        if (userData.disable) {
          res.json({ message: "User is disabled", status: false });
          return; // Exit the function if the user is disabled
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
    const {
      firstName,
      secondName,
      email,
      password,
      otp,
      education,
      intro,
      contact,
    } = req.body;
    if (
      !firstName ||
      !secondName ||
      !email ||
      !password ||
      !otp ||
      !education ||
      !intro ||
      !contact
    ) {
      res.json({
        message: "Enter all data including OTP, education, intro, and contact",
        status: false,
      });
      return;
    }

    const otpQuery =
      "SELECT * FROM user WHERE email = ? AND resetToken = ? AND resetTokenExpiration > NOW()";
    const [otpRows] = await pool.query(otpQuery, [email, otp]);
    if (otpRows.length === 0) {
      res.json({
        message: "Invalid OTP or OTP has expired",
        status: false,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const updateQuery =
      "UPDATE user SET firstName = ?, secondName = ?, password = ?, education = ?, intro = ?, contact = ? WHERE email = ?";
    await pool.query(updateQuery, [
      firstName,
      secondName,
      hashedPassword,
      education,
      intro,
      contact,
      email,
    ]);

    res
      .status(201)
      .json({ message: "User signed up successfully", status: true });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ message: "An error occurred while signing up", status: false });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.json({ message: "Please provide your email", status: false });
      return;
    }

    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM user WHERE email = ?";
    const [existingUser] = await pool.query(checkEmailQuery, [email]);

    if (existingUser.length === 0) {
      // If no record exists, insert a new one
      const resetToken = Math.floor(Math.random() * 900000) + 100000;

      // Insert a new record with email, resetToken, and expiry in the database
      const insertResetTokenQuery =
        "INSERT INTO user (email, resetToken, resetTokenExpiration) VALUES (?, ?, NOW() + INTERVAL 1 HOUR)";
      await pool.query(insertResetTokenQuery, [email, resetToken]);

      // Send the OTP (assuming you have a function named sendInitialOtp)
      sendInitialOtp(email, resetToken);

      res.json({
        message: "OTP sent to your email",
        status: true,
        resetToken: resetToken,
      });
    } else if (!existingUser[0].firstName) {
      // If a record exists and has a firstName, update the record
      const resetToken = Math.floor(Math.random() * 900000) + 100000;

      // Update the existing record with a new resetToken and resetTokenExpiration
      const updateResetTokenQuery =
        "UPDATE user SET resetToken = ?, resetTokenExpiration = NOW() + INTERVAL 1 HOUR WHERE email = ?";
      await pool.query(updateResetTokenQuery, [resetToken, email]);

      // Send the OTP (assuming you have a function named sendInitialOtp)
      sendInitialOtp(email, resetToken);

      res.json({
        message: "OTP sent to your email and record updated",
        status: true,
        resetToken: resetToken,
      });
    } else {
      res.json({
        message: "User already exists",
        status: false,
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      message: "An error occurred while processing your request",
      status: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.json({ message: "Please provide your email", status: false });
      return;
    }

    // Check if the user with the provided email exists in the database
    const userQuery = "SELECT * FROM user WHERE email = ?";
    const [userRows] = await pool.query(userQuery, [email]);

    if (userRows.length === 0) {
      res.json({ message: "User not found", status: false });
      return;
    }

    const resetToken = Math.floor(Math.random() * 900000) + 100000;

    const updateTokenQuery =
      "UPDATE user SET resetToken = ?, resetTokenExpiration = ? WHERE email = ?";
    const tokenExpiration = new Date(Date.now() + 7200000); // Token expires in 1 hour
    await pool.query(updateTokenQuery, [resetToken, tokenExpiration, email]);

    sendResetEmail(email, resetToken);

    res.json({
      message: "Password reset token sent to your email",
      status: true,
      resetToken: resetToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
      status: false,
    });
  }
};

async function sendResetEmail(email, token) {
  const passwordMsg = {
    from: "naveen@naveenrio.me",
    to: email,
    subject: "RESET PASSWORD",
    html: `<div>OTP for reseting your Password ${token}. This will expire in an hour</div>`,
  };
  nodemailer
    .createTransport({
      auth: {
        user: GRIEVANCE_EMAIL,
        pass: GRIEVANCE_EMAIL_PASSWORD,
      },
      port: 465,
      secure: true,
      host: "smtpout.secureserver.net",
    })
    .sendMail(passwordMsg, (err) => {
      if (err) {
        return console.log("error while sending mail", err);
      } else {
        return console.log("email sent");
      }
    });
}
const GRIEVANCE_EMAIL = "naveen@naveenrio.me";
const GRIEVANCE_EMAIL_PASSWORD = "N@veen4752";
async function sendInitialOtp(email, token) {
  const passwordMsg = {
    from: "naveen@naveenrio.me",
    to: email,
    subject: "OTP verification",
    html: `<div>OTP verification for your email ${token}. This will expire in an hour</div>`,
  };
  nodemailer
    .createTransport({
      auth: {
        user: GRIEVANCE_EMAIL,
        pass: GRIEVANCE_EMAIL_PASSWORD,
      },
      port: 465,
      secure: true,
      host: "smtpout.secureserver.net",
    })
    .sendMail(passwordMsg, (err) => {
      if (err) {
        return console.log("error while sending mail", err);
      } else {
        return console.log("email sent");
      }
    });
}
const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      res.json({ message: "Please provide all required data", status: false });
      return;
    }

    // Check if the user with the provided email and resetToken exists in the database
    const userQuery = "SELECT * FROM user WHERE email = ? AND resetToken = ?";
    const [userRows] = await pool.query(userQuery, [email, resetToken]);

    if (userRows.length === 0) {
      res.json({
        message: "Invalid reset token",
        status: false,
      });
      return;
    }

    const user = userRows[0];

    // Check if the resetToken has expired
    if (user.resetTokenExpiration < new Date()) {
      res.json({
        message: "Expired reset token",
        status: false,
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password and reset token fields in the database
    const updatePasswordQuery =
      "UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE email = ?";
    await pool.query(updatePasswordQuery, [hashedPassword, email]);

    res.json({
      message: "Password reset successful",
      status: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request",
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
      return;
    }

    const email = req.data.id;
    const firstName = req.data.firstName;
    const secondName = req.data.secondName;
    const projectId = bookidgen("Guest-", 14522, 199585);
    const imageQuery = "SELECT id, image FROM user WHERE email = ?";
    const [image] = await pool.query(imageQuery, [email]);
    const profileImage = image[0].image;
    const userId = image[0].id;
    const insertQuery =
      "INSERT INTO projects (projectTitle, projectId, email, projectDescription, startDate, endDate, contactNumber, projectSummary, projectType, document, keywords, firstName, secondName, image, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
      JSON.stringify(keywords), // Store keywords as JSON string
      firstName,
      secondName,
      profileImage,
      userId,
    ]);

    res
      .status(201)
      .json({ message: "Project posted successfully", status: true });
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
      SELECT * FROM projects
      WHERE (projectType = 1 OR (projectType = 0 AND email = ?))
        AND (endDate IS NULL OR endDate >= CURDATE())
    `;
    const [projects] = await pool.query(selectQuery, [email]);
    const studentQuery = `
    SELECT * FROM studentProject
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

    const [comments] = await pool.query(query);
    data.forEach((element) => {
      element.comment = getCommentsByProjectId(comments, element.projectId);
    });

    res.status(200).json({ data: data, status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching projects",
      status: false,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const email = req.data.id;

    const userQuery =
      "SELECT id,firstName,secondName,email,image,education,intro,contact FROM user WHERE email = ?";
    const [userResult] = await pool.query(userQuery, [email]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    const user = userResult[0];

    const projectsQuery = "SELECT * FROM projects WHERE email = ?";
    const [projectsResult] = await pool.query(projectsQuery, [email]);

    const response = {
      user,
      projects: projectsResult,
    };

    res
      .status(200)
      .json({ data: response, message: "User details found", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching user details and projects",
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
      "SELECT firstName, secondName FROM user WHERE email = ?",
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
      "SELECT firstName, secondName FROM user WHERE email = ?",
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

const flagComment = async (req, res) => {
  const { commentId, flag } = req.body;
  if (flag === undefined) {
    return res
      .status(400)
      .json({ message: "flag value is required", status: false });
  }
  if (typeof flag !== "boolean") {
    return res
      .status(400)
      .json({ message: "flag value must be a boolean", status: false });
  }
  if (!commentId) {
    return res
      .status(400)
      .json({ message: "Comment ID is required", status: false });
  }
  try {
    const selectQuery = "SELECT flag FROM comments WHERE id = ?";
    const [rows] = await pool.query(selectQuery, [commentId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Comment not found", status: false });
    }
    const existingDisableStatus = rows[0].flag;
    if (existingDisableStatus == flag) {
      const action = flag ? "flagged true" : "flagged false";
      return res
        .status(200)
        .json({ message: `Comment is already ${action}`, status: false });
    }
    const updateQuery = "UPDATE comments SET flag = ? WHERE id = ?";
    await pool.query(updateQuery, [flag, commentId]);
    const action = flag ? "flagged" : "flag removed";
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

const flagSubComment = async (req, res) => {
  const { commentId, flag } = req.body;
  if (flag === undefined) {
    return res
      .status(400)
      .json({ message: "flag value is required", status: false });
  }
  if (typeof flag !== "boolean") {
    return res
      .status(400)
      .json({ message: "flag value must be a boolean", status: false });
  }
  if (!commentId) {
    return res
      .status(400)
      .json({ message: "Comment ID is required", status: false });
  }
  try {
    const selectQuery = "SELECT flag FROM subComments WHERE id = ?";
    const [rows] = await pool.query(selectQuery, [commentId]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Comment not found", status: false });
    }
    const existingDisableStatus = rows[0].flag;
    if (existingDisableStatus == flag) {
      const action = flag ? "flagged true" : "flagged false";
      return res
        .status(200)
        .json({ message: `Comment is already ${action}`, status: false });
    }
    const updateQuery = "UPDATE subComments SET flag = ? WHERE id = ?";
    await pool.query(updateQuery, [flag, commentId]);
    const action = flag ? "flagged" : "flag removed";
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
const uploadImage = async (req, res) => {
  try {
    const email = req.data.id;
    const { image } = req.body;
    if (!image) {
      res.json({ message: "No image data provided", status: false });
      return;
    }
    const checkGuestQuery = "SELECT * FROM user WHERE email = ?";
    const [existingGuest] = await pool.query(checkGuestQuery, [email]);
    if (existingGuest.length === 0) {
      res.json({ message: "Guest does not exist", status: false });
      return;
    }
    const updateImageQuery = "UPDATE user SET image = ? WHERE email = ?";
    await pool.query(updateImageQuery, [image, email]);
    const updateProjectsImageQuery = `
    UPDATE projects
    SET image = ?
    WHERE email = ?
    `;
    const [result] = await pool.query(updateProjectsImageQuery, [image, email]);
    res.json({ message: "Image updated successfully", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "An error occurred during image upload",
      status: false,
    });
  }
};
const postRequest = async (req, res) => {
  try {
    const {
      projectId,
      projectTitle,
      projectEmail,
      firstName,
      secondName,
      email,
      contact,
      experience,
      skill,
      document,
    } = req.body;
    if (
      !projectId ||
      !projectTitle ||
      !projectEmail ||
      !firstName ||
      !secondName ||
      !email ||
      !contact ||
      !experience ||
      !skill ||
      !document
    ) {
      return res
        .status(400)
        .json({ message: "All fields are mandatory", status: false });
    }
    const insertQuery = `
      INSERT INTO request (projectId, projectTitle,projectEmail, firstName, secondName, email, contact, experience, skill, document)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.query(insertQuery, [
      projectId,
      projectTitle,
      projectEmail,
      firstName,
      secondName,
      email,
      contact,
      experience,
      skill,
      document,
    ]);
    res
      .status(200)
      .json({ message: "Request added successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while adding the request",
      status: false,
    });
  }
};

const getRequst = async (req, res) => {
  try {
    const email = req.data.id;
    const selectQuery = `
      SELECT * FROM request WHERE projectEmail = ?
    `;
    const [result] = await pool.query(selectQuery, [email]);
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
const flagUser = async (req, res) => {
  try {
    const { userId, email, flag } = req.body;
    const checkUserQuery = "SELECT * FROM user WHERE id = ? AND email = ?";
    const [existingUser] = await pool.query(checkUserQuery, [userId, email]);
    if (existingUser.length > 0) {
      const updateUserQuery =
        "UPDATE user SET flag = ? WHERE id = ? AND email = ?";
      await pool.query(updateUserQuery, [flag, userId, email]);
    } else {
      const checkStudentQuery =
        "SELECT * FROM student WHERE id = ? AND email = ?";
      const [existingStudent] = await pool.query(checkStudentQuery, [
        userId,
        email,
      ]);
      if (existingStudent.length > 0) {
        const updateStudentQuery =
          "UPDATE student SET flag = ? WHERE id = ? AND email = ?";
        await pool.query(updateStudentQuery, [flag, userId, email]);
      } else {
        return res
          .status(404)
          .json({ message: "User or student not found", status: false });
      }
    }
    return res
      .status(200)
      .json({ message: "User or student flaged successfully", status: true });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
const getSingleUserProject = async (req, res) => {
  try {
    const { userId, email } = req.body;
    const selectQuery = `
    SELECT * FROM studentProject
    WHERE (projectType = 1 AND email = ? AND userId = ?)
      AND (endDate IS NULL OR endDate >= CURDATE())
  `;
    const [projects] = await pool.query(selectQuery, [email, userId]);
    const studentQuery = `
    SELECT * FROM projects
    WHERE (projectType = 1 AND email = ? AND userId = ?)
      AND (endDate IS NULL OR endDate >= CURDATE())
  `;
    const [studentProjects] = await pool.query(studentQuery, [email, userId]);

    let data = projects.concat(studentProjects);
    res.status(200).json({ data: data, status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "An error occurred while fetching projects",
      status: false,
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    // Check if status is valid
    const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      res.status(400).json({
        message:
          "Invalid status. Allowed values are 'PENDING', 'APPROVED', or 'REJECTED'.",
        status: false,
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        message: "Request ID is required",
        status: false,
      });
      return;
    }

    const checkRequestQuery = `
      SELECT * FROM request
      WHERE id = ?`;
    const [requests] = await pool.query(checkRequestQuery, [id]);

    if (requests.length > 0) {
      const updateRequestQuery = `
        UPDATE request
        SET status = ?
        WHERE id = ?`;
      await pool.query(updateRequestQuery, [status, id]);
    } else {
      res.status(404).json({
        message: "Request not found",
        status: false,
      });
      return;
    }

    res.status(200).json({
      message: "Request status updated successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating request status",
      status: false,
    });
  }
};
const flagProject = async (req, res) => {
  try {
    const { projectId, flag } = req.body;
    if (typeof projectId === "undefined" || typeof flag !== "boolean") {
      return res.status(400).json({
        message: "Project ID and flag are required, and flag must be a boolean",
        status: false,
      });
    }
    const checkProjectQuery = "SELECT * FROM projects WHERE projectId = ?";
    const [existingProject] = await pool.query(checkProjectQuery, [projectId]);
    if (existingProject.length > 0) {
      const updateProjectQuery =
        "UPDATE projects SET flag = ? WHERE projectId = ?";
      await pool.query(updateProjectQuery, [flag, projectId]);
    } else {
      const checkStudentProjectQuery =
        "SELECT * FROM studentProject WHERE projectId = ?";
      const [existingStudentProject] = await pool.query(
        checkStudentProjectQuery,
        [projectId]
      );

      if (existingStudentProject.length > 0) {
        const updateStudentProjectQuery =
          "UPDATE studentProject SET flag = ? WHERE projectId = ?";
        await pool.query(updateStudentProjectQuery, [flag, projectId]);
      } else {
        return res
          .status(404)
          .json({ message: "Project not found", status: false });
      }
    }

    return res
      .status(200)
      .json({ message: "Project flagged successfully", status: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
};
const disableProject = async (req, res) => {
  try {
    const { projectId, disable } = req.body;
    if (!projectId || disable === undefined) {
      return res.status(400).json({
        message: "Project ID and disable flag are required",
        status: false,
      });
    }
    const checkProjectQuery = "SELECT * FROM projects WHERE projectId = ?";
    const [existingProject] = await pool.query(checkProjectQuery, [projectId]);
    if (existingProject.length > 0) {
      const disableValue = disable ? 1 : 0;
      const disableProjectQuery =
        "UPDATE projects SET disable = ? WHERE projectId = ?";
      await pool.query(disableProjectQuery, [disableValue, projectId]);
    } else {
      const checkStudentProjectQuery =
        "SELECT * FROM studentProject WHERE projectId = ?";
      const [existingStudentProject] = await pool.query(
        checkStudentProjectQuery,
        [projectId]
      );
      if (existingStudentProject.length > 0) {
        const disableValue = disable ? 1 : 0;
        const disableStudentProjectQuery =
          "UPDATE studentProject SET disable = ? WHERE projectId = ?";
        await pool.query(disableStudentProjectQuery, [disableValue, projectId]);
      } else {
        return res
          .status(404)
          .json({ message: "Project not found", status: false });
      }
    }

    return res.status(200).json({
      message: "Project disabled status updated successfully",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
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
      SELECT projectId FROM projects 
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
      UPDATE projects 
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
      "DELETE FROM projects WHERE projectId = ? AND email = ?";

    await pool.query(deleteQuery, [projectId, email]);

    res.json({ message: "Project deleted successfully", status: true });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
const getUserDetail = async (req, res) => {
  try {
    const { userId, email } = req.body;

    // Check if userId and email are provided in the request body
    if (!userId || !email) {
      return res.status(400).json({
        message: "userId and email are mandatory fields",
        status: false,
      });
    }

    // Rest of your code remains the same...

    // Check if the user exists in the user table
    const checkUserQuery = "SELECT * FROM user WHERE id = ? AND email = ?";
    const [user] = await pool.query(checkUserQuery, [userId, email]);

    if (user.length > 0) {
      // User found in the user table
      // Get the count of projects associated with the user's email
      const userProjectCountQuery =
        "SELECT COUNT(*) as projectCount FROM projects WHERE email = ?";
      const [userProjectCount] = await pool.query(userProjectCountQuery, [
        email,
      ]);

      return res.status(200).json({
        message: "User found in the user table",
        status: true,
        user: { ...user[0], projectCount: userProjectCount[0].projectCount },
      });
    } else {
      // User not found in the user table, check the student table
      const checkStudentQuery =
        "SELECT * FROM student WHERE id = ? AND email = ?";
      const [student] = await pool.query(checkStudentQuery, [userId, email]);

      if (student.length > 0) {
        // User found in the student table
        // Get the count of projects associated with the user's email from the studentProject table
        const studentProjectCountQuery =
          "SELECT COUNT(*) as projectCount FROM studentProject WHERE email = ?";
        const [studentProjectCount] = await pool.query(
          studentProjectCountQuery,
          [email]
        );

        return res.status(200).json({
          message: "User found in the student table",
          status: true,
          user: {
            ...student[0],
            projectCount: studentProjectCount[0].projectCount,
          },
        });
      } else {
        // User not found in either table
        return res.status(404).json({
          message: "User not found in user or student table",
          status: false,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  postProject,
  getAllProjects,
  sendOtp,
  getUserDetails,
  postComment,
  postSubComment,
  flagComment,
  flagSubComment,
  uploadImage,
  postRequest,
  getRequst,
  flagUser,
  getSingleUserProject,
  updateRequestStatus,
  flagProject,
  disableProject,
  editProject,
  deleteProject,
  getUserDetail,
};

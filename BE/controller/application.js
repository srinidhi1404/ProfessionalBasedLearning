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
      const sqlQuery = "SELECT * FROM user WHERE email = ?";
      const [results] = await pool.execute(sqlQuery, [email]);

      if (results.length === 0) {
        res.json({ msg: "User does not exist" });
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
    const { firstName, secondName, email, password, otp } = req.body;

    // Check if any required field is missing
    if (!firstName || !secondName || !email || !password || !otp) {
      res.json({ message: "Enter all data including OTP", status: false });
      return;
    }

    // Check if the provided OTP is correct
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

    // update the new user
    const updateQuery =
      "UPDATE user SET firstName = ?, secondName = ?, password = ? WHERE email = ?";
    await pool.query(updateQuery, [firstName, secondName, password, email]);
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
  const body = {
    from: "dgpadmin@naveenrio.me",
    to: email,
    subject: `RESET PASSWORD`,
    html: `<div>OTP for reseting your Password ${token}. This will expire in an hour</div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
    } else {
      return console.log("email sent");
    }
  });
}

async function sendInitialOtp(email, token) {
  const body = {
    from: "dgpadmin@naveenrio.me",
    to: email,
    subject: `OTP verification`,
    html: `<div>OTP verification for your email ${token}. This will expire in an hour</div>`,
  };

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io", //sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api", //86207576053cfe",
      pass: "82bc5abcc46929231dcc93949027783b", //df87b6e5a6cb1d"
    },
  });

  await transport.sendMail(body, (err) => {
    if (err) {
      return console.log("error occurs", err);
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

    // Update the user's password and reset token fields in the database
    const updatePasswordQuery =
      "UPDATE user SET password = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE email = ?";
    await pool.query(updatePasswordQuery, [newPassword, email]);

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
      const email = req.data.id;
      const firstName = req.data.firstName;
      const secondName = req.data.secondName;
      const insertQuery =
        "INSERT INTO projects (projectTitle,email, projectDescription, startDate, endDate, contactNumber, projectSummary, projectType, document, firstName, secondName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

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
    const selectQuery = "SELECT * FROM projects";
    const [projects] = await pool.query(selectQuery);

    res.status(200).json({ projects, status: true });
  } catch (error) {
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
      "SELECT id,firstName,secondName,email FROM user WHERE email = ?";
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

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  postProject,
  getAllProjects,
  sendOtp,
  getUserDetails,
};

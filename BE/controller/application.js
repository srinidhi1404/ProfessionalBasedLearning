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
          const token = jwt.sign({ id: userData.email }, config.JWT_TOKEN_KEY);
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
      res.json({ message: "enter all data", status: false });
    } else {
      const insertQuery =
        "INSERT INTO user (firstName, secondName, email, password) VALUES (?,?, ?, ?)";
      let data = await pool.query(insertQuery, [
        firstName,
        secondName,
        email,
        password,
      ]);
      res
        .status(201)
        .json({ message: "User signed up successfully", status: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while signing up", status: false });
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
    const tokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour
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
    from: "conference2023@naveenrio.me",
    to: email,
    subject: `Paper submitted`,
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

const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword } = req.body;

    if (!email || !resetToken || !newPassword) {
      res.json({ message: "Please provide all required data", status: false });
      return;
    }

    // Check if the user with the provided email and valid reset token exists in the database
    const userQuery =
      "SELECT * FROM user WHERE email = ? AND resetToken = ? AND resetTokenExpiration > NOW()";
    const [userRows] = await pool.query(userQuery, [email, resetToken]);
    if (userRows.length === 0) {
      res.json({
        message: "Invalid reset token or expired token",
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

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};

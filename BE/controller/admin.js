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

module.exports = {
  signup,
  login,
};

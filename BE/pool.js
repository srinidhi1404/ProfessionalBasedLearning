const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "db4free.net",
  port: 3306,
  user: "dgp1db",
  password: "august@2023",
  database: "dgp1db",
  connectionLimit: 100,
  multipleStatements: true,
});

module.exports = pool;

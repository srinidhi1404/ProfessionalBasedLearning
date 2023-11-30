const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const application = require("./router/application");
const student = require("./router/student");
const admin = require("./router/admin");
const meta = require("./router/meta");
const fileupload = require("express-fileupload");

const port = 3000;
// security
app.use(helmet());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', cors());

// cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));
app.use("/api", meta);
app.use("/api", application);
app.use("/student", student);
app.use("/admin", admin);
app.get("/", (req, res) => res.send("running"));

app.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});

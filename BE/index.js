const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const application = require("./router/application");
const student = require("./router/student");
const admin = require("./router/admin");
const meta = require("./router/meta");
const fileupload = require("express-fileupload");

const port = process.env.PORT || 3000;

// security
app.use(helmet());

// cors
app.use(cors({
  origin: "https://professional-based-learning-qene.vercel.app", // Allow requests from your Vercel domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, authentication headers)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({ useTempFiles: true }));
app.use("/api", meta);
app.use("/api", application);
app.use("/student", student);
app.use("/admin", admin);
app.get("/", (req, res) => res.send("success"));

app.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});

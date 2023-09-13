const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const application = require("./router/application");

const port = 3000;
// security
app.use(helmet());

// cors
app.use(cors());
app.use(express.json());
app.use("/api", application);
app.get("/", (req, res) => res.send("success"));

app.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});

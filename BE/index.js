const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const application = require("./router/application");
const student = require("./router/student");
const admin = require("./router/admin");
const meta = require("./router/meta");
const fileupload = require("express-fileupload");
const {
  S3
} = require("@aws-sdk/client-s3");
const s3 = new S3();

const port = 3000;
// security
app.use(helmet());

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

// curl -i https://some-app.cyclic.app/myFile.txt
app.get("*", async (req, res) => {
  let filename = req.path.slice(1);

  try {
    let s3File = await s3
      .getObject({
        Bucket: process.env.BUCKET,
        Key: filename,
      });

    res.set("Content-type", s3File.ContentType);
    res.send(s3File.Body.toString()).end();
  } catch (error) {
    if (error.code === "NoSuchKey") {
      console.log(`No such key ${filename}`);
      res.sendStatus(404).end();
    } else {
      console.log(error);
      res.sendStatus(500).end();
    }
  }
});

// curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://some-app.cyclic.app/myFile.txt
app.put("*", async (req, res) => {
  let filename = req.path.slice(1);

  console.log(typeof req.body);

  await s3
    .putObject({
      Body: JSON.stringify(req.body),
      Bucket: process.env.BUCKET,
      Key: filename,
    });

  res.set("Content-type", "text/plain");
  res.send("ok").end();
});

// curl -i -XDELETE https://some-app.cyclic.app/myFile.txt
app.delete("*", async (req, res) => {
  let filename = req.path.slice(1);

  await s3
    .deleteObject({
      Bucket: process.env.BUCKET,
      Key: filename,
    });

  res.set("Content-type", "text/plain");
  res.send("ok").end();
});

// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
app.use("*", (req, res) => {
  res.sendStatus(404).end();
});

app.listen(port, () => {
  console.log(`local server started on http://localhost:${port}`);
});

const express = require("express");
const app = express();

require("dotenv").config();

//middleware (to parse json body)
app.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});

app.get("/", (req, res) => {
  res.send("This is HomePage....");
});

const blog = require("./routes/blog");

//mount route
app.use("/api/v1", blog);

//for database connection
const dbConnect = require("./config/database");
dbConnect();

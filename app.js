require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const connectDB = require("./database/db");
const contactRouter = require("./routes/contacts");
const blogRouter = require("./routes/blogs");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const applicationRouter = require("./routes/applications");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1", contactRouter);
app.use("/api/v1", blogRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", jobRouter);
app.use("/api/v1", applicationRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    console.log("Database Connected✨");
  } catch (error) {
    console.error("Database Connection Error:❌", error);
    return error;
  }
};

app.listen(port, () => {
  console.log(`Server Listening at ${port}✨ `);
  start();
});

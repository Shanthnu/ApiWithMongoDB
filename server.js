const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const myDataRoutes = require("./routes/apiRoutes"); //  fetch/add user logic
const userUploadRoutes = require("./routes/uploadRoutes"); //  upload logic

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/data", myDataRoutes); // → /api/data/addUser, /api/data/getlist
app.use("/api", userUploadRoutes); // → /api/users/:id/upload

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went wrong!",
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Connection error:", err));

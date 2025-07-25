const express = require("express");
const MyData = require("../models/dataModel");
const { addUserSchema } = require("../validations/validation");

const validate = require("../middlewares/validateMiddleware");
const router = express.Router();

// GET all documents
router.get("/getlist/", async (req, res) => {
  try {
    // -> controller
    console.log("GET request to:", req.originalUrl);
    const data = await MyData.find(); // -> service

    if (data.length == 0) {
      dataParser(res, 400, "There is no data found", []);
      //res.json({ statusCode: 400, message: "There is no data found" });
    } else {
      dataParser(res, 200, "", data);
      // res.json({ statusCode: 200, list: data, message: "" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/addUser", validate(addUserSchema), async (req, res) => {
  console.log("Post requestL", req.originalUrl);
  try {
    const newEntry = new MyData(req.body);
    const saved = await newEntry.save();
    console.log("USer added succeed");
    res.status(200).json(saved);
  } catch (error) {
    res.status(500).json({ err: error.message, statusCode: 500 });
  }
});

function dataParser(res, status, message, data) {
  console.log("ssss");
  res.json({ statusCode: status, message: message, list: data });
}

// db.user.updateOne({ _id: ObjectId("6871445b73a17abda90ee369"),skills: ["Swift", "ObjectiveC", "NodeJs", "React"]}, {$set: {skills: ["ReactNative"] }
// })
//Automigration
//joi validation
//Midle ware -> Auth token
//OTP generate:
//email - smtp
//eslint
//format package - pretty

//error handling middle ware for hole application
//file uploading

//multiple port folder structure

// POST new document
// router.post("/", async (req, res) => {
//   try {
//     const newEntry = new MyData(req.body);
//     const saved = await newEntry.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = router;

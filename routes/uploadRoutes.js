const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadFilesMiddleware");
const MyData = require("../models/dataModel");

// ✅ PUT /api/users/:id/upload (optional file upload)
router.put(
  "/users/:id/upload",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.params.id;

      const updates = {};
      if (req.files?.profileImage) {
        updates.profileImage = req.files.profileImage[0].filename;
      }
      if (req.files?.resume) {
        updates.resume = req.files.resume[0].filename;
      }

      const updatedUser = await MyData.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "File(s) uploaded successfully",
        user: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;

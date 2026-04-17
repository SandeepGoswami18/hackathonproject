const express = require("express");
const router = express.Router();

// ✅ FIXED PATH
const Complaint = require("../models/Complaint");

// 🔥 department logic
function getDepartment(category) {
  if (category === "Pothole") return "Road Department";
  if (category === "Garbage Dump") return "Sanitation";
  if (category === "Broken Streetlight") return "Electricity";
  if (category === "Water Leak") return "Jal Nigam";
  return "General";
}

// 👉 POST
router.post("/", async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      department: getDepartment(req.body.category)
    });

    const saved = await newComplaint.save();
    res.status(201).json(saved);

  } catch (err) {
    console.log(err); // 👈 debugging
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 👉 GET
router.get("/", async (req, res) => {
  try {
    const data = await Complaint.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
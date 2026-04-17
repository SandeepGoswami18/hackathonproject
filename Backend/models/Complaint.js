const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  category: String,
  description: String,
  location: {
    lat: Number,
    lng: Number
  },
  image: String,
  status: {
    type: String,
    default: "Pending"
  },
  department: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
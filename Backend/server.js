const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

const main = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

main()
.then(() => {
    console.log("Mongodb connected");
}).catch((err) => {
    console.log(err);
});

// 🔥 IMPORTANT FIX
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

const complaintsRoutes = require("./routes/complaints");

app.use("/complaints", complaintsRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
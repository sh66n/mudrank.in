const mongoose = require("mongoose");
const connectDb = require("../connection");
connectDb("mongodb://127.0.0.1:27017/mudrank");
const PostalCircle = require("../models/postalCircle");
const bcrypt = require("bcrypt");
const details = [
  { username: "AP", name: "Andhra Pradhesh" },
  { username: "AS", name: "Assam" },
  { username: "BR", name: "Bihar" },
  { username: "CG", name: "Chhattisgarh" },
  { username: "DL", name: "Delhi" },
  { username: "GJ", name: "Gujarat" },
  { username: "HR", name: "Haryana" },
  { username: "HP", name: "Himachal Pradesh" },
  { username: "JK", name: "Jammu Kashmir" },
  { username: "JH", name: "Jharkhand" },
  { username: "KA", name: "Karnataka" },
  { username: "KL", name: "Kerala" },
  { username: "MP", name: "Madhya Pradesh" },
  { username: "MH", name: "Maharashtra" },
  { username: "NE", name: "North Eastern" },
  { username: "OR", name: "Odisha" },
  { username: "PB", name: "Punjab" },
  { username: "RJ", name: "Rajasthan" },
  { username: "TN", name: "Tamil Nadu" },
  { username: "TG", name: "Telangana" },
  { username: "UP", name: "Uttar Pradesh" },
  { username: "UK", name: "Uttarakhand" },
  { username: "WB", name: "West Bengal" },
];

const createCircle = async (detail) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash("123", salt);
  const newCircle = await PostalCircle.create({
    ...detail,
    hashedPassword,
  });
};

for (const detail of details) {
  createCircle(detail);
}

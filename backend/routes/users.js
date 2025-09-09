const express = require("express");
const router = express.Router();
const db = require("../db");

// Create user
router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO users (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, name });
  });
});

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// Create task
router.post("/", (req, res) => {
  const { user_id, title } = req.body;
  db.query(
    "INSERT INTO tasks (user_id, title) VALUES (?, ?)",
    [user_id, title],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, user_id, title, completed: false });
    }
  );
});

// Get tasks by user
router.get("/", (req, res) => {
  const { userId } = req.query;
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// Update task
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task updated" });
    }
  );
});

// Delete task
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task deleted" });
  });
});

module.exports = router;

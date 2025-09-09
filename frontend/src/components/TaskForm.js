import { useState } from "react";
import axios from "axios";

export default function TaskForm({ user, refreshTasks }) {
  const [title, setTitle] = useState("");

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/tasks", { user_id: user.id, title });
    setTitle("");
    refreshTasks();
  };

  return (
    <div className="task-form">
      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="New Task" 
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

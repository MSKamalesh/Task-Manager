import axios from "axios";

export default function TaskList({ tasks, refreshTasks }) {
  const toggleTask = async (task) => {
    await axios.put(`http://localhost:5000/tasks/${task.id}`, { completed: !task.completed });
    refreshTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    refreshTasks();
  };

  return (
    <ul>
      {tasks.map(t => (
        <li key={t.id}>
          <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {t.title}
          </span>
          <div>
            <button onClick={() => toggleTask(t)}>
              {t.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

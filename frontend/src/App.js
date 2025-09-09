import { useState, useEffect } from "react";
import axios from "axios";
import UserSelect from "./components/UserSelect";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedUser) {
      axios.get(`http://localhost:5000/tasks?userId=${selectedUser.id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedUser]);

  const refreshTasks = () => {
    if (selectedUser) {
      axios.get(`http://localhost:5000/tasks?userId=${selectedUser.id}`)
        .then(res => setTasks(res.data))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <UserSelect users={users} setSelectedUser={setSelectedUser} />
      {selectedUser && (
        <>
          <TaskForm user={selectedUser} refreshTasks={refreshTasks} />
          <TaskList tasks={tasks} refreshTasks={refreshTasks} />
        </>
      )}
    </div>
  );
}

export default App;

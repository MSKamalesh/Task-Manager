export default function UserSelect({ users, setSelectedUser }) {
  return (
    <select onChange={e => {
      const user = users.find(u => u.id == e.target.value);
      setSelectedUser(user);
    }}>
      <option value="">Select User</option>
      {users.map(u => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}

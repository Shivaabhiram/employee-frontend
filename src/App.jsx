import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  const addEmployee = async () => {
    await API.post("/employees", { name, salary });
    fetchEmployees();
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Salary Tracker</h1>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Salary" onChange={e => setSalary(e.target.value)} />

      <button onClick={addEmployee}>Add</button>

      {employees.map(emp => (
        <div key={emp.id}>
          {emp.name} - ₹{emp.salary}
          <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
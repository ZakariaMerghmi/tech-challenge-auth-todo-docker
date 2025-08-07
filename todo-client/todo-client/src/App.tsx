import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4001";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${API_BASE}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTodos(res.data))
      .catch(console.error);
  }, [token]);

  const handleLogin = async () => {
  console.log("Login button clicked"); 
  try {
    const res = await axios.post("http://localhost:4000/login", {
      email: "test@example.com",
      password: "123456",
    });
    console.log("Login success:", res.data); 
    setToken(res.data.token);
  } catch (err) {
    console.error("Login failed", err);
  }
};


  const addTodo = async () => {
    try {
      const res = await axios.post(
        `${API_BASE}/todos`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Todo App</h1>
      {!token ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <>
          <input
            placeholder="New task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title} - {todo.completed ? "✅" : "❌"}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;

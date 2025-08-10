import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:4001";

interface LoginResponse {
  token: string;
}

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
    .get<Todo[]>(`${API_BASE}/todos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setTodos(res.data))
    .catch(console.error);
}, [token]);


  const handleLogin = async () => {
  console.log("Login button clicked");

  try {
    const res = await axios.post<LoginResponse>("http://localhost:4000/login", {
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
  if (!title.trim()) {
    return;
  }
  
  try {
    const res = await axios.post<Todo>(
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


  const deleteTodo = async (id : number) => {
    try {
      await axios.delete(`${API_BASE}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen w-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">Todo App</h1>
          </div>
          
          <div className="p-8">
            {!token ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome Back!</h2>
                  <p className="text-gray-500 mb-6">Please login to access your todos</p>
                </div>
                <button 
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Login
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      placeholder="What needs to be done?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"

                    />
                    <button 
                      onClick={addTodo}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {todos.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-500">No todos yet. Add one please</p>
                    </div>
                  ) : (
                    todos.map((todo) => (
                      <div key={todo.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group">
                        <span className="text-gray-700 font-medium flex-1">{todo.title}</span>
                        <button 
                          onClick={() => deleteTodo(todo.id)}
                          className="ml-3 bg-gradient-to-t from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-md opacity-0 group-hover:opacity-100"
                        >
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {todos.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                      {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
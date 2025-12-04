import { useState } from "react";
import { api } from "./api/api";
import { useAuth } from "./contexts/AuthContext";
import type { User } from "./contexts/AuthContext";
import { useNavigate } from "react-router";

type LoginResponse = {
  data: User | null;
  message: string;
};

function App() {
  const [username, setUsername] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return alert("Username cannot be empty");

    try {
      const result = await api<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify({ username }),
      });

      setUser(result.data);
      navigate("/chat", { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        alert(`Gagal login: ${err.message}`);
      } else {
        alert("Gagal login: unknown error");
      }
    }
  };

  return (
    <div className="bg-orange-50 h-screen sm:px-20 sm:py-10 md:px-70 md:py-20 flex justify-center items-center">
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-full h-full max-w-md bg-orange-100 rounded-xl shadow p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-medium">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

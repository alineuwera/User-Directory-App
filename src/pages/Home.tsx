import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { useUserContext } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [apiUsers, setApiUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { state } = useUserContext();
  const { theme, toggleTheme } = useTheme(); // 👈 get theme & toggle function

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setApiUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  const allUsers = [...apiUsers, ...state.users];

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={
        `p-4 min-h-screen` +
        (theme === "dark" ? " bg-gray-900 text-white" : " bg-white text-black")
      }
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-gray-900 text-white p-2 rounded"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <h1 className="text-2xl font-bold mb-4">User Directory</h1>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className={`border p-2 mb-4 w-full max-w-sm rounded`}
      />

      {/* User List */}
      <div className="grid gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`border p-4 rounded shadow bg-white ${
                theme == "dark" ? "dark:bg-gray-800" : "bg-white"
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme == "dark" ? "text-white" : ""
                }`}
              >
                {user.name}
              </h2>
              <p className={`${theme == "dark" ? "text-white" : ""}`}>
                {user.email}
              </p>
              <Link
                to={`/users/${user.id}`}
                className="text-blue-500 hover:underline"
              >
                View Profile
              </Link>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setApiUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;

  const allUsers = [...apiUsers, ...state.users];

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}
    >
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center gap-2"
      >
        {theme === "light" ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
            Dark Mode
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Light Mode
          </>
        )}
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Directory</h1>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className={`w-full max-w-md p-3 mb-6 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
              >
                <h2
                  className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {user.name}
                </h2>
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{user.email}</p>
                <Link
                  to={`/users/${user.id}`}
                  className="text-blue-500 hover:text-blue-600 font-medium transition"
                >
                  View Profile
                </Link>
              </div>
            ))
          ) : (
            <p className="text-red-500 col-span-full">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
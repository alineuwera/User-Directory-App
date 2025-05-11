import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../types/user";
import { useTheme } from "../context/ThemeContext";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          if (!response.ok) {
            throw new Error("User not found");
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError("Error fetching user data");
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [id]);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        {user ? (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{user.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
            <p className="text-gray-700 dark:text-gray-300">Phone: {user.phone}</p>
            <p className="text-gray-700 dark:text-gray-300">Website: {user.website}</p>
            <p className="text-gray-700 dark:text-gray-300">Company: {user.company?.name}</p>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">User not found.</p>
        )}
      </div>
    </div>
  );
}
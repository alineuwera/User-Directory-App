import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User } from "../types/user";

export default function UserProfile() {
  const { id } = useParams<{ id: string }>(); // Extract user ID from URL params
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {user ? (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company?.name}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}

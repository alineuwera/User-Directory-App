import { useState } from "react";
import type { User } from "../types/user";
import { UserRole } from "../types/user";
import { useUserContext } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { useUserForm } from "../hooks/useUserForm";

export default function AddUser() {
  const { register, handleSubmit, formState: { errors }, reset } = useUserForm();
  const [newUser, setNewUser] = useState<User | null>(null);
  const { dispatch } = useUserContext();
  const { theme } = useTheme();

  const onSubmit = (data: any) => {
    const user: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      age: data.age,
      role: data.role,
    };
    dispatch({ type: "ADD_USER", payload: user });
    setNewUser(user);
    reset();
  };

  return (
    <div className={`min-h-screen p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-white"} transition-colors duration-300`}>
      <div className="max-w-lg mx-auto">
        <h1 className={`text-3xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : ""}`}>Add New User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age:</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 18, message: "Must be 18 or older" },
              })}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role:</label>
            <select
              {...register("role", { required: "Role is required" })}
              className={`w-full p-3 border rounded-lg ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"} focus:ring-2 focus:ring-blue-500 transition`}
            >
              {Object.values(UserRole).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add User
          </button>
        </form>

        {newUser && (
          <div className={`mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            <h2 className="text-xl font-semibold mb-3">New User Added:</h2>
            <p className="text-gray-700 dark:text-gray-300">Name: {newUser.name}</p>
            <p className="text-gray-700 dark:text-gray-300">Email: {newUser.email}</p>
            <p className="text-gray-700 dark:text-gray-300">Age: {newUser.age}</p>
            <p className="text-gray-700 dark:text-gray-300">Role: {newUser.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}
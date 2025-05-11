import { useForm } from "react-hook-form";
import { useState } from "react";
import type { User } from "../types/user";
import { useUserContext } from "../context/UserContext";

interface FormData {
  name: string;
  email: string;
  age: number;
}

export default function AddUser() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [newUser, setNewUser] = useState<User | null>(null);
  const { dispatch } = useUserContext();

  const onSubmit = (data: FormData) => {
    const user: User = {
      id: Date.now(), // just a fake unique ID
      name: data.name,
      email: data.email,
      age: data.age,
    };
    dispatch({ type: "ADD_USER", payload: user });
    setNewUser(user);
    reset();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
            className="border p-2 w-full rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Age:</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              min: { value: 18, message: "Must be 18 or older" },
            })}
            className="border p-2 w-full rounded"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>

      {newUser && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h2 className="text-lg font-semibold mb-2">New User Added:</h2>
          <p>Name: {newUser.name}</p>
          <p>Email: {newUser.email}</p>
          <p>Age: {newUser.age}</p>
        </div>
      )}
    </div>
  );
}

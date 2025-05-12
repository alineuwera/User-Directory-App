import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex gap-4 fixed top-0 w-full">
      <Link to="/">Home</Link>
      <Link to="/add-user">Add User</Link>
    </nav>
  );
}

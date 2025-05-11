import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import UserProfile from "./pages/UserProfile";
import AddUser from "./pages/AddUser";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/add-user" element={<AddUser />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

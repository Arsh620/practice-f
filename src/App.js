import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserForm from "./components/UserForm";
import HomeDataForm from "./components/HomeDataForm";

function App() {
  let userData = localStorage.getItem("user");
  console.log("sdvsdvsv:", userData);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={userData ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/home-content" element={<HomeDataForm />} />
      </Routes>
    </Router>
  );
}

export default App;

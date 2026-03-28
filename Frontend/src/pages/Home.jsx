import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/getMe");
        setUser(res.data.user);
      } catch (err) {
        navigate("/login")
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/logout");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  // Static Dummy Data
  const leads = ["Acme Corp", "TechSoft", "Innova Ltd"];
  const tasks = ["Call client", "Prepare report", "Team meeting"];
  const users = ["John", "Sarah", "Mike"];

  return (
    <div className="home">
      {/* Header */}
      <header className="home-header">
        <h1>Dashboard</h1>
        <p>
          Welcome, <span>{user?.name || "User"}</span> 👋
        </p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Grid Sections */}
      <div className="home-grid">
        {/* Leads */}
        <div className="home-card">
          <h2>Leads</h2>
          <ul>
            {leads.map((lead, i) => (
              <li key={i}>{lead}</li>
            ))}
          </ul>
        </div>

        {/* Tasks */}
        <div className="home-card">
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>

        {/* Users */}
        <div className="home-card">
          <h2>Users</h2>
          <ul>
            {users.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
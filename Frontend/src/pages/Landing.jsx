import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-box">
        <h1>Welcome 👋</h1>
        <p>Please choose an option</p>

        <div className="btn-group">
          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
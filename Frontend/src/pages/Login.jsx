import { useState } from "react";
import axiosInstance from "../services/api";
import "../styles/auth.css";
import { loginSchema } from "../schema/authSchema";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({}); 

    try {
      await axiosInstance.post("/login", form);
      navigate("/home")
      alert("Login successful");
    } catch (err) {
        console.log(err);
        console.log(err.response);
        console.log(err.response?.data);

      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email[0]}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password[0]}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
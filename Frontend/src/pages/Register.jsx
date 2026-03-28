import { useState } from "react";
import axiosInstance from "../services/api";
import "../styles/auth.css";
import { registerSchema } from "../schema/authSchema"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    try {
      await axiosInstance.post("/register", form);
      alert("Registered successfully");
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name[0]}</p>}

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
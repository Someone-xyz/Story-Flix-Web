import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userApi";
import useAuth from "../hooks/useAuth";
import '../pagescss/Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      console.log(data);

      login(data.userId);

      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>

    </div>
  );
}

export default Login;
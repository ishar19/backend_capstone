import { login } from "../services/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    login(data).then((response) => {
      alert(`Welcome, ${response.data.name}`);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      navigate("/jobs");
    });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const response = await register(data);
    alert(response.data);
    navigate("/login");
  };
  console.log(data);
  return (
    <div>
      <h1>Register</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          margin: "auto",
        }}
        onSubmit={registerUser}
      >
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="mobile"
          onChange={handleChange}
          placeholder="Mobile"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <div>
          <input type="checkbox" id="checkbox" name="checkbox" />
          <label htmlFor="checkbox">I agree to the terms and conditions</label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

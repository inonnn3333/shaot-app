import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post("http://localhost:1010/users/login", formData);
            const res = await apiService.login(formData.email, formData.password);
            localStorage.setItem("token", res.data.token);
            if (res.status === 200) {
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "שגיאה בעת ההתחברות");
            // navigate("/my-board");
        }
    };

    return (
        <div style={{ maxWidth: 400, paddingTop: "20em" }}>
        <h2>התחברות</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="אימייל"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <br />
            <input
                type="password"
                name="password"
                placeholder="סיסמה"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <br />
            <button type="submit">התחבר</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;

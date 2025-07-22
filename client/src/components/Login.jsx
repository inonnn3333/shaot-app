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
            const res = await apiService.login(formData.email, formData.password);
            console.log("🔓 התחברות הצליחה:", res);
    
            if (res?.token) {
                localStorage.setItem("token", res.token);
                navigate("/home");
            } else {
                throw new Error("טוקן לא התקבל מהשרת");
            }
        } catch (err) {
            console.error("❌ Login error:", err);
            setError(err.message || "שגיאה בעת ההתחברות");
        }
    };
    

    return (
        <div className="login-container">
            <div>
                <img src="images/login-bgc-img.png" alt="login-bgc-img" />
            </div>
            <div className="login-div">
                <h2>היי</h2>
                <p>התחבר/י לחשבון שלך</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <img src="images/user-icon.png" alt="login-bgc-iuser-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="אימייל"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <img src="images/lock-icon.png" alt="lock-icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="סיסמה"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">התחבר/י</button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <p className="register-link">
                    אין לך חשבון?{" "}
                    <span onClick={() => navigate("/register")}>הרשמה</span>
                </p>
            </div>
        
        </div>
    );
};

export default Login;

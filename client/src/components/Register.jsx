import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService"; 

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // כאן תשלב קריאה ל-API:
            await apiService.register(formData);

            console.log("📤 נשלח לשרת:", formData);
            navigate("/login");
        } catch (err) {
            setError("שגיאה בעת ההרשמה");
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            <h2>הרשמה</h2>
            <p>צור את החשבון החדש שלך</p>
            <form onSubmit={handleSubmit}className="register-form">
                <div className="input-container">
                    <img src="images/user-icon.png" alt="user-icon" />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="שם פרטי"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <img src="images/user-icon.png" alt="user-icon" />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="שם משפחה"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <img src="images/phone-icon.png" alt="phone-icon" />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="מספר טלפון"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <img src="images/email-icon.png" alt="email-icon" />
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

                <button type="submit">הירשם</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <p className="login-link">
                כבר יש לך חשבון?{" "}
                <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "blue" }}>
                    התחבר/י
                </span>
            </p>
        </div>
    );
};

export default Register;

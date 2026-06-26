import { useState } from "react";
import { registerUser } from "../services/userApi";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import '../pagescss/Register.css'

function Register() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("FORM DATA:", form);
        try {
            const data = await registerUser(form);

            login(data.userData._id);

            navigate("/dashboard");
        } catch (err) {
            console.log("❌ ERROR FULL:", err);
            console.log("❌ RESPONSE DATA:", err.response?.data);
            console.log("❌ STATUS:", err.response?.status);
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} />
                <input name="lastname" placeholder="Last Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
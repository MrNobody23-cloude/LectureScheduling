import { useState } from "react";
import API from "../api";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            alert("Enter both username and password");
            return;
        }

        const res = await fetch(API + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            alert("Server returned non-JSON response. Check if backend is running.");
            return;
        }

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            if (data.userId) localStorage.setItem("userId", data.userId);
            onLogin(data.role);
        } else {
            alert(data.msg || "Login failed");
        }
    };

    return (
        <div style={{ maxWidth: "350px", margin: "100px auto", textAlign: "center", border: "1px solid #ddd", padding: "30px", borderRadius: "10px" }}>
            <h2>Login</h2>
            <input
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <button onClick={handleLogin} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Login
            </button>
        </div>
    );
}

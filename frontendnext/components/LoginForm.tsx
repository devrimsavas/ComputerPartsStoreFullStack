"use client";

import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

function LoginForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 super important
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful!");
        // 🔁 Now redirect the user in Next.js
        window.location.href = "/";
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <Input
        id="username"
        name="username"
        label="Username"
        placeholder="Your username"
        type="text"
        autoComplete="username"
        required
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="Your password"
        autoComplete="current-password"
        required
      />
      <Button type="submit">Login</Button>
      <div className="mt-4 text-sm text-gray-600">{message}</div>
    </form>
  );
}

export default LoginForm;

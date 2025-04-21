// components/LogoutLink.tsx
"use client";

import Button from "./Button";

const LogoutLink = () => {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3001/logout/json", {
        credentials: "include",
      });
      window.location.href = "/"; // main page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Button onClick={handleLogout} variant="secondary">
      Logout
    </Button>
  );
};

export default LogoutLink;

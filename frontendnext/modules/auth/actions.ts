"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
// Our URL constants we have created
import { LOGIN_API_URL, REGISTER_API_URL } from "@/lib/constants";

export async function registerUser(
  prevState: { message: string },
  formData: FormData
) {
  const username = formData.get("username");
  const password = formData.get("password");

  try {
    const response = await fetch(REGISTER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return { message: json.error || "Registration failed." };
    }

    return { message: json.message || "Registered successfully." };
  } catch (error) {
    console.error("register error", error);
    return { message: "Failed to create user" };
  }
}

export async function loginUser(
  prevState: { message: string },
  formData: FormData
) {
  const username = formData.get("username"); // username
  const password = formData.get("password");

  try {
    const response = await fetch(LOGIN_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return { message: json.error || "Login failed." };
    }

    // You can store info in a cookie or session later here
    return { message: `Logged in as: ${json.redirectTo || username}` };
  } catch (error) {
    console.error("login error", error);
    return { message: "Failed to log in user" };
  }
}

export async function logoutUser() {
  try {
    await fetch("http://localhost:3001/logout/json", {
      method: "GET",
      credentials: "include",
    });

    redirect("/login");
  } catch (err) {
    console.error("Logout failed:", err);
    redirect("/login");
  }
}

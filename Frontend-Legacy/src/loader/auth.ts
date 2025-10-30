import axios from "axios";
import { redirect } from "react-router-dom";

export async function authLoader() {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    return redirect("/access");
  }

  try {
    const res = await axios.get("http://127.0.0.1:8000/api/check", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    localStorage.removeItem("token");
    return redirect("/access");
  }
}
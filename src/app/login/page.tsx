"use client";

import toast from "react-hot-toast";
import LoginForm from "./components/LoginForm";

type LoginResponse = {
  token: string;
  role: "user" | "admin";
  fullName: string;
  userId: string;
};

type ErrorResponse = {
  error: string;
};

export default function LoginPage() {
  const onSubmit = async (data: { fullName: string; password: string }) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        throw new Error(errorData.error || "خطای ناشناخته!");
      }

      const result: LoginResponse = await res.json();

      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      localStorage.setItem("fullName", result.fullName);
      localStorage.setItem("userId", result.userId);

      toast.success("ورود موفقیت‌آمیز بود!");
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("یک خطای غیرمنتظره رخ داد!");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

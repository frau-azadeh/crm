"use client";

import { useState } from "react";

type PasswordChangeFormProps = {
  onSubmit: (data: { newPassword: string; confirmPassword: string }) => void;
};

export default function PasswordChangeForm({
  onSubmit,
}: PasswordChangeFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ newPassword, confirmPassword });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block mb-1">پسورد جدید</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <div>
        <label className="block mb-1">تایید پسورد</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        تغییر پسورد
      </button>
    </form>
  );
}

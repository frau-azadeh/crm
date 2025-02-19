"use client";

import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/ModalPassword";
import PasswordChangeButton from "./components/PasswordChangeButton";
import PasswordChangeForm from "./components/PasswordChangeForm";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

export default function SettingPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handlePasswordChangeSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("رمز عبور و تکرارش یکسان نیست!");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("مشکلی در شناسایی کاربر وجود دارد.");
      return;
    }

    try {
      await axiosInstance.put(`/login/${userId}`, {
        password: data.newPassword,
      });

      toast.success("رمز عبور با موفقیت تغییر کرد!");
      setModalOpen(false);
    } catch (error) {
      toast.error("مشکلی در ارتباط با سرور پیش آمده است!");
    }
  };

  return (
    <div className="flex">
      <div className="w-full max-w-md rounded-lg shadow bg-white p-6">
        <PasswordChangeButton onClick={handleOpenModal} />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <span className="text-xl font-bold mb-4">فرم تغییر پسورد</span>
        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
      </Modal>
      <Toaster position="top-center" />
    </div>
  );
}

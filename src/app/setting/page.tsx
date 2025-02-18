"use client"

import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/ModalPassword";
import PasswordChangeButton from "./components/PasswordChangeButton";
import PasswordChangeForm from "./components/PasswordChangeForm";
import { useState } from "react";

export default function SettingPage() {

  const[isModalOpen, setModalOpen] = useState (false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () =>setModalOpen(false);

  const handlePasswordChangeSubmit = async (data:{newPassword: string; confirmPassword: string}) =>{

    toast.success('پسورد با موفقیت تغییر کرد')
    setModalOpen(false);

  }
  return(
    <div className="flex">
      <div className="w-full max-w-md rounded-lg shadow bg-white p-6">
        <PasswordChangeButton onClick={handleOpenModal}/>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <span className="text-xl font-bold mb-4">فرم تغییر پسورد</span>
        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit}/>
      </Modal>
      <Toaster position="top-center"/>
    </div>
  )
}
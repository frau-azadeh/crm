'use client';

import { useState } from 'react';
import Modal from './components/ModalPassword';
import PasswordChangeButton from './components/PasswordChangeButton';
import PasswordChangeForm from './components/PasswordChangeForm';

export default function SettingPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handlePasswordChangeSubmit = async (data: { newPassword: string; confirmPassword: string }) => {
    setModalOpen(false);
  };

  return (
    <div className="flex ">
      <div className="bg-white rounded-lg p-10 shadow-md">
        <PasswordChangeButton onClick={handleOpenModal} />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">تغییر پسورد</h2>
        <PasswordChangeForm onSubmit={handlePasswordChangeSubmit} />
      </Modal>
    </div>
  );
}

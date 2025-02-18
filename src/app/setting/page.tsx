'use client';

import { useState } from 'react';
import ModalPassword from "./components/ModalPassword";

export default function Setting() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="h-screen flex  bg-gray-100">
      <a
        href="#"
        className="text-blue-500 underline"
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
      >
        فرم را باز کن
      </a>

      <ModalPassword isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">فرم نمونه</h2>
        <p>اینجا فرم می‌تونه باشه...</p>
      </ModalPassword>
    </div>
  );
}

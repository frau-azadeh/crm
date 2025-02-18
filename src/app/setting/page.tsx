"use client"

import { useState } from "react";
import ModalPassword from "./components/ModalPassword";

export default function Setting () {
  const[isModalOpen, setIsModalOpen] = useState(false);
  return(
    <div className="flex">
      <div className="bg-white rounded-md w-full max-w-md p-6 shadow-lg">
        <a
          href="#"
          onClick={(e)=>{
            e.preventDefault();
            setIsModalOpen(true);
          }}
          className="text-blue-500 transition font-bold text-lg hover:text-blue-900"
        >
          تغییر پسورد
        </a>
      </div>
      <ModalPassword isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}>
        <span className="text-gray-950 ">تغییر پسورد : </span>
      </ModalPassword>
    </div>
  )
}
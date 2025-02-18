"use client"

import { useState } from "react";
import ModalPassword from "./components/ModalPassword";

export default function Setting () {
  const[isModalOpen, setModalOpen] = useState(false);
  return(
    <div className=" flex">
        <div className="bg-white rounded-lg flex w-full max-w-md p-10">
          <a href="#"
            className="text-blue-600"
            onClick={(e) =>{
              e.preventDefault();
              setModalOpen(true);
            }}
          >
            تغییر پسورد 
          </a>
        </div>
      <ModalPassword isOpen={isModalOpen} onClose={()=> setModalOpen(false)}>
            <h2>تغییر پسورد</h2>
      </ModalPassword>
    </div>
  )
}
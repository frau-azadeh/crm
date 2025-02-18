import { useState } from "react";

type PasswordFormData = {
  newPassword: string;
  confirmPassword: string;
}

type PasswordFormDataProps = {
  onSubmit: (data: PasswordFormData) => void;
}

export default function PasswordChangeForm ({onSubmit}:PasswordFormDataProps){
  const[newPassword, setNewPassword] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");

  const handelPassword = (e: React.FormEvent) =>{
    e.preventDefault();
    onSubmit({newPassword, confirmPassword});
  }
  return(
    <form onSubmit={handelPassword} className="flex flex-col gap-2">
      <div>
        <label className="block mb-1">پسورد جدید</label>
        <input
         type="password"
         required
         className="bg-slate-100 border-slate-300 rounded p-2 w-full"
         onChange={(e)=>setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label className="block mb-1">تایید پسورد</label>
        <input 
          type="password"
          required
          className="bg-slate-100 border-slate-300 rounded p-2 w-full"
          onChange={(e) =>setConfirmPassword(e.target.value)}/>
      </div>
      <button 
        type="submit"
        className="bg-blue-500 hover:bg-blue-900 rounded p-2 text-white  w-full"
      >
        تایید
      </button>
    </form>
  )
}
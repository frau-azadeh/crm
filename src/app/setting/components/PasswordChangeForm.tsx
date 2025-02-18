import { useForm } from "react-hook-form";

type PasswordFormData = {
  newPassword: string;
  confirmPassword: string;
}

type PasswordFormDataProps = {
  onSubmit: (data: PasswordFormData) => void;
}
export default function PasswordChangeForm({onSubmit}:PasswordFormDataProps){

  const {register, handleSubmit, formState: {errors}} = useForm<PasswordFormData>();
  
  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div>
        <label className="block mb-1">پسورد جدید</label>
        <input 
          type="password" 
          {...register('newPassword', {required:'پسورد جدید الزامی میباشد'})}
          className="border-2 border-gray-400 bg-gray-50 rounded p-2 w-full focus:outline-none focus:border-blue-500"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">تغییر پسورد</label>
        <input 
          {...register('confirmPassword', {required: 'پر کردن این فیلد الزامی است'})}
          type="password" 
          className="border-2 border-gray-400 bg-gray-50 rounded p-2 w-full focus:outline-none focus:border-blue-500"

        />
        {errors.confirmPassword&&(
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>
      <button 
        type="submit"
        className=" bg-blue-500 w-full text-white p-2 rounded transition hover:bg-blue-950"
      >
        تغییر پسورد
     </button>
    </form>
  )
}
'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type LoginFormValues = {
  fullName: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Form Data:', data);

    // مثلا اعتبارسنجی فیک برای تست
    if (data.fullName === 'علی رضایی' && data.password === '123456') {
      toast.success('ورود با موفقیت انجام شد!');
    } else {
      toast.error('نام یا رمز عبور اشتباه است!');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">ورود به سیستم</h1>

        <div>
          <label className="block mb-1">نام و نام خانوادگی:</label>
          <input
            {...register('fullName', { required: true })}
            type="text"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">رمز عبور:</label>
          <input
            {...register('password', { required: true })}
            type="password"
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          ورود
        </button>
      </form>
    </div>
  );
}

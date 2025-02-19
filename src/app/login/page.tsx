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
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'خطای ناشناخته!');
      }

      // ذخیره توکن و نقش کاربر در لوکال استوریج
      localStorage.setItem('token', result.token);
      localStorage.setItem('role', result.role);
      localStorage.setItem('fullName', result.fullName);

      toast.success('ورود موفقیت‌آمیز بود!');

      // ریدایرکت (مثلاً به داشبورد)
      window.location.href = '/';
    } catch (error: any) {
      toast.error(error.message);
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

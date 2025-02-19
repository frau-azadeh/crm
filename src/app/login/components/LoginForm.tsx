'use client';

import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';

type LoginFormValues = {
  fullName: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (data: LoginFormValues) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">ورود به سیستم</h1>

      <Input
        label="نام و نام خانوادگی"
        {...register('fullName', { required: true })}
      />
      <Input
        label="رمز عبور"
        type="password"
        {...register('password', { required: true })}
      />

      <Button type="submit">ورود</Button>
    </form>
  );
}

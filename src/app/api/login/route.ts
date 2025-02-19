import { NextResponse } from 'next/server';
import { User } from '@/types/user';

export async function POST(request: Request) {
  const { fullName, password } = await request.json();

  const res = await fetch('https://67b59f1807ba6e59083dafc9.mockapi.io/login');
  const users: User[] = await res.json();

  const user = users.find((u) => u.fullName === fullName && u.password === password);

  if (!user) {
    return NextResponse.json({ error: 'نام یا رمز عبور اشتباه است!' }, { status: 401 });
  }

  return NextResponse.json({
    token: user.token,
    role: user.role,
    fullName: user.fullName,
    userId: user.id,
  });
}

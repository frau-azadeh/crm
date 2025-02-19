import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { fullName, password } = await request.json();

  // داده‌های تستی (فیک) برای لاگین
  const fakeUsers = [
    { fullName: "احمد رضایی", password: "123456", role: "user", token: "user-token" },
    { fullName: "مدیر سیستم", password: "admin123", role: "admin", token: "admin-token" },
  ];

  const user = fakeUsers.find(
    (u) => u.fullName === fullName && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "نام یا رمز عبور اشتباه است!" }, { status: 401 });
  }

  return NextResponse.json({
    token: user.token,
    role: user.role,
    fullName: user.fullName,
  });
}

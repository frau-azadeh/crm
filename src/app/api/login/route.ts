import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { fullName, password } = await request.json();
  const { data: users } = await axiosInstance.get<User[]>("/login");

  const user = users.find(
    (u) => u.fullName === fullName && u.password === password,
  );
  if (!user) {
    return NextResponse.json(
      { error: "نام کاربری یا رمز عبور اشتباه است" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    token: user.token,
    role: user.role,
    fullName: user.fullName,
    userId: user.id,
  });
}

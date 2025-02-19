export type User = {
  id: string;
  fullName: string;
  password: string;
  role: "admin" | "user";
  token: string;
  userId?: string; 
}



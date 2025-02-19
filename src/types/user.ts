export type User = {
    id: string;
    fullName: string;
    password: string;
    role: 'user' | 'admin';
    token: string;
    userId?: string;
  };
  
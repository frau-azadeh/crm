import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="bg-blue-500 text-white hover:bg-blue-900 p-2 rounded shadow-md w-full "
    >
      {children}
    </button>
  );
}

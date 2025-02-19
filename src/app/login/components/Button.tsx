type ButtonProps = {
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>;
  
  export default function Button({ children, ...rest }: ButtonProps) {
    return (
      <button
        {...rest}
        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
      >
        {children}
      </button>
    );
  }
  
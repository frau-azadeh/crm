type InputProps = {
    label: string;
    type?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>;
  
  export default function Input({ label, type = 'text', ...rest }: InputProps) {
    return (
      <div>
        <label className="block mb-1">{label}:</label>
        <input
          type={type}
          className="border p-2 w-full rounded"
          {...rest}
        />
      </div>
    );
  }
  
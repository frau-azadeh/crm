type PasswordChangeProps = {
  onClick: () => void;
};

export default function PasswordChangeButton({ onClick }: PasswordChangeProps) {
  return (
    <button
      onClick={onClick}
      className="text-blue-500 font-bold hover:text-blue-950 transition"
    >
      تغییر پسورد
    </button>
  );
}

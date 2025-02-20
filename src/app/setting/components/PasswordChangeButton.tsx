type PasswordChangeProps = {
  onClick: () => void;
};

export default function PasswordChangeButton({ onClick }: PasswordChangeProps) {
  return (
    <button
      onClick={onClick}
      className="text-blue500 font-bold hover:text-blue950 transition"
    >
      تغییر پسورد
    </button>
  );
}

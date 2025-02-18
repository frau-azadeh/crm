type PasswordChangeButtonProps = {
  onClick: () => void;
};

export default function PasswordChangeButton({
  onClick,
}: PasswordChangeButtonProps) {
  return (
    <button className="text-blue-600 " onClick={onClick}>
      تغییر پسورد
    </button>
  );
}

type PasswordChangeButtonProps = {
    onClick: () => void;
}
export default function PasswordChangeButton ({onClick}: PasswordChangeButtonProps) {
    return(
        <button  
            className="text-blue-500 font-bold text-lg hover:text-blue-950 transition"
            onClick={onClick}
        >
            تغییر پسورد
        </button>
    )
}
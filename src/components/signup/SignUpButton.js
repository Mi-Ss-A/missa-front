const SignUpButton = ({ label, onClick }) => (
    <button
        type="submit"
        onClick={onClick}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
        {label}
    </button>
);

export default SignUpButton;

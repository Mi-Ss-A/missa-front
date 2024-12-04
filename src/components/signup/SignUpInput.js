const SignUpInput = ({ label, name, type = 'text', value, onChange, required = true }) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
            required={required}
        />
    </div>
);

export default SignUpInput;

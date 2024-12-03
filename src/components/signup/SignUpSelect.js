const SignUpSelect = ({ label, name, options, value, onChange, required = true }) => (
    <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
            required={required}
        >
            <option value="">선택</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SignUpSelect;

// File: src/components/auth/AuthInput.jsx

// AuthInput is a reusable input component for handling form fields
// Used in both Login and Signup forms to keep code clean and DRY
export default function AuthInput({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-100 rounded-xl"
      value={value}
      onChange={onChange}
      required
    />
  );
}

import { useState } from "react";

const InputField = ({ label, onChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="input-field">{label}</label> {/* Added htmlFor */}
      <input
        id="input-field" // Added id to associate with label
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;





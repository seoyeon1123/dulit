import React from 'react';

export interface IInputProps {
  name: string;
  type: string;
  placeholder: string;
  error?: string[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 타입 변경
}

const Input = ({ name, value, onChange, type, placeholder, error }: IInputProps) => {
  return (
    <div className="flex flex-grow items-center gap-2">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1
        focus:ring-primary focus:border-primary transition duration-300 ease-in-out w-full "
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

import React from 'react';

interface Props {
  children?: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  handleChange: (value: string) => void;
  handleUpdate: () => void;
}

const FormInput = ({
  children,
  type,
  placeholder,
  value,
  error,
  handleChange,
  handleUpdate,
}: Props) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => handleUpdate()}
      />
      {children}
      {error && <div>{error}</div>}
    </>
  );
};

export default FormInput;

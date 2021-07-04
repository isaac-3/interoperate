import React from 'react';

interface Props {
  children?: React.ReactNode;
  className: string;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  handleChange: (value: string) => void;
  handleUpdate: () => void;
}

const FormInput = ({
  children,
  className,
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
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => handleUpdate()}
        data-valid={error.length === 0}
      />
      {children}
      <div className="error-message">{error}</div>
    </>
  );
};

export default FormInput;

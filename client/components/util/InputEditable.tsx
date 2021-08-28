import React, { useRef } from 'react';

interface Props {
  value: string;
  handleChange: (value: string) => void;
  handleUpdate: () => void;
  style?: object;
}

const InputEditable = ({
  value = "",
  handleUpdate,
  handleChange,
  style,
}: Props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      data-valid={value.length !== 0}
      ref={titleInputRef}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={() => handleUpdate()}
      onKeyDown={(e) => {
        const key = e.keyCode || e.charCode;
        if (key === 13 && e.shiftKey === false) {
          titleInputRef.current?.blur();
          handleUpdate();
        }
      }}
      style={style}
    />
  );
};

export default InputEditable;

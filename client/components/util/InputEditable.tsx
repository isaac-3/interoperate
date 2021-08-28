import React, { useEffect, useRef } from 'react';

interface Props {
  value: string;
  handleChange: (value: string) => void;
  handleUpdate: () => void;
  outline: boolean;
  focusInput?: boolean;
  style?: object;
}

const InputEditable = ({
  value = "",
  handleUpdate,
  handleChange,
  outline = true,
  focusInput,
  style,
}: Props) => {
  const titleInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (focusInput !== null && focusInput) {
      titleInputRef.current?.focus();
    }
  }, [focusInput]);

  return (
    <textarea
      className="input-editable"
      data-outline={outline}
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

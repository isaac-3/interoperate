import React, { useRef } from 'react';

interface Props {
  value: string;
  handleChange: (value: string) => void;
  handleUpdate: () => void;
  outline: boolean;
  style?: object;
}

const InputEditable = ({
  value = "",
  outline = true,
  handleUpdate,
  handleChange,
  style,
}: Props) => {
  const titleInputRef = useRef<HTMLTextAreaElement>(null);

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

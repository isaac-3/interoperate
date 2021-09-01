import React, { forwardRef, useImperativeHandle, useRef } from 'react';

interface InputProps {
  value: string;
  handleChange: (value: string) => void;
  handleUpdate: () => void;
  outline?: boolean;
  style?: object;
  className?: string;
}

interface InputHandle {
  focusInput: () => void;
}

const InputEditable = forwardRef<InputHandle, InputProps>(
  (
    {
      value = "",
      handleChange,
      handleUpdate,
      outline = true,
      style,
      className,
    },
    forwardedRef
  ) => {
    const titleInputRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(forwardedRef, () => ({
      focusInput: () => {
        titleInputRef.current?.focus();
        if (titleInputRef.current)
          titleInputRef.current.selectionStart =
            titleInputRef.current.value.length;
      },
    }));

    return (
      <textarea
        className={`input-editable ${className}`}
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
          }
        }}
        style={style}
      />
    );
  }
);

export default InputEditable;

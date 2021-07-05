import { useState } from 'react';
import validateData from './validateData';

export const useForm = (type: string) => {
  const [value, setValue] = useState("");

  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
    setError(validateData(value, type));
  };

  const handleUpdate = (): boolean => {
    const err = validateData(value, type);
    setError(err);
    return err.length === 0;
  };

  return [value, error, handleChange, handleUpdate] as const;
};

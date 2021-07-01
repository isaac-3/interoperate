import { useState } from 'react';
import validateData from './validateData';

export const useForm = (type: string) => {
  const [value, setValue] = useState("");

  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setValue(value);
    setError(validateData(value, type));
  };

  const handleUpdate = () => {
    setError(validateData(value, type));
  };

  return [value, error, handleChange, handleUpdate] as const;
};

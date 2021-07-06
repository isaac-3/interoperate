const validateData = (value: string, type: string): string => {
  let error = "";

  switch (type) {
    case "username":
      if (!value.trim()) {
        error = "Username required";
      }
      break;
    case "password":
      if (!value.trim()) {
        error = "Password is required";
        break;
      }
      if (value.trim().length < 6) {
        error = "Password needs to be 6 characters or more";
      }
      break;
    case "email":
      if (!value.trim()) {
        error = "Email is required";
        break;
      }
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Email address is invalid";
      }
      break;
    case "new-project":
      if (!value.trim()) {
        error = "Project name is required";
        break;
      }
      if (value.trim().length < 4) {
        error = "Project name needs to be 4 characters or more";
      }
      break;
  }

  return error;
};

export default validateData;

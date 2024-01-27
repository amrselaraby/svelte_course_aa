export const validateRequiredField = (value, label = "field") => {
  let error;
  if (!value) {
    error = `${label} is required.`;
  }
  return error;
};

export const validateEmail = (value, label = "email") => {
  let error;
  if (
    value &&
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      value
    )
  ) {
    error = `${label} is invalid.`;
  }
  return error;
};

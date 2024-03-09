export const validateEmail = (email: string): boolean => {
  //const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegex =
    /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;

  return emailRegex.test(String(email).toLowerCase());
};

export const validatePasswordComplexity = (password: string): boolean => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
};

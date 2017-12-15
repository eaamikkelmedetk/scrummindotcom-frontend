export const required = value => (value ? undefined : "Field is required");
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
export const minLength = min => value =>
  value && value.length < min
    ? `Must be at least ${min} characters long`
    : undefined;
export const minLength3 = minLength(3);
export const onlyLettersAndDigits = value =>
  value && !/[A-Za-z0-9]/.test(value)
    ? "Only alphanumeric letters is allowed"
    : undefined;

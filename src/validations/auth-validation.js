const capitalPasswordValidation = {
  pattern: /(?=.*[A-Z])/,
  message: "Password must contain at least one capital letter!",
};

const symbolPasswordValidation = {
  pattern: /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
  message: "Password must contain at least one symbol!",
};

const numberPasswordValidation = {
  pattern: /(?=.*\d)/,
  message: "Password must contain at least one number!",
};


export { capitalPasswordValidation, symbolPasswordValidation, numberPasswordValidation }
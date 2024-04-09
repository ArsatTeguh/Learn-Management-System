export function isPasswordValid(password: string) {
  if (password.length < 6) {
    return false;
  }
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  if (!hasNumber || !hasLetter) {
    return false;
  }
  const hasSpecialCharacter = /[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/\-='"]/.test(
    password,
  );
  if (hasSpecialCharacter) {
    return false;
  }
  return true;
}

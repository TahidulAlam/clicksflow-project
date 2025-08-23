export const generateRandomPassword = (length: number = 10): string => {
  const MIN = 6;
  const MAX = 64;
  const validLength = Math.max(MIN, Math.min(length, MAX));

  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?@#$%^&*";

  return Array.from({ length: validLength }, () =>
    charset[Math.floor(Math.random() * charset.length)]
  ).join("");
};

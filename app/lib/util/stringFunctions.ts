/**
 *
 * @param str Input String
 * @returns String in Kebab Case Format
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/[:;,.!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/]+/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
};

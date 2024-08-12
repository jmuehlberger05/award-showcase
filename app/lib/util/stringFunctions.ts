/**
 * @param str Input String
 * @returns String in Kebab Case Format
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/[:;,.!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/]+/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase(); // Convert to lowercase
};

/**
 * @param base Base String
 * @param value Value String
 * @returns String in ID format
 * @example toIdString("#base", "Value Example") => "#base-value-example"
 */
export const toIdString = (base: string, value: string): string => {
  return `${base}-${toKebabCase(value)}`;
};

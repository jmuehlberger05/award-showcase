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
 * @param id ID Number
 * @returns String in ID format
 * @example toIdString("#base", "Value Example", 13) => "#base-value-example-13"
 */
export const toIdString = (base: string, value: string, id: number): string => {
  return `${base}-${toKebabCase(value)}-${id}`;
};

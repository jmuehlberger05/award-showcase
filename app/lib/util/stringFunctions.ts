export const toKebabCase = (str: string): string => {
  return str.replace(/\s+/g, "-").toLowerCase();
};

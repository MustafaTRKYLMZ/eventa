export const generateUniqueName = (prefix: string) => {
  return `${prefix} ${new Date().toLocaleTimeString()}`;
};

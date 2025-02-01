/**
 * Generates a random 7-character string identifier.
 *
 * @returns {string} a 7-character string identifier.
 */
export const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 9);
};

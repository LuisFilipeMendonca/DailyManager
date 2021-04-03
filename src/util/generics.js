export const objSort = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

export const addPadStart = (value, valueLength, padLength) => {
  return value.toString().padStart(valueLength, padLength);
};

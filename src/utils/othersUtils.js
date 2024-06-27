export const capitalize = (input) => {
  let text = String(input);

  if (text.length === 0) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const lowerText = (input) => {
  let text = String(input);
  if (text.length === 0) {
    return '';
  }
  return text.toLowerCase();
};

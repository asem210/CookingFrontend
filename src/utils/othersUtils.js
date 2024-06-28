export const capitalize = (input) => {
  let text = String(input);

  if (text.length === 0) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const lowerText = (input) => {
  let text = String(input);
  if (text.length === 0) return '';

  return text.toLowerCase();
};

export const capitalizeAllSentences = (input) => {
  let text = String(input);
  if (text.length === 0) return '';
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

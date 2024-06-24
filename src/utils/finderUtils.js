export const getObjectById = (array, idObject) => {
  return array.find((item) => item.id === idObject);
};

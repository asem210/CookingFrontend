import ingredientService from "../apis/ingredient";

export const searchIngredients = async (searchQuery) => {
  try {
    const searchResponse = await ingredientService.getByName(searchQuery);
    return searchResponse.data;
  } catch (error) {
    console.log("Error searching ingredients:", error);
    throw error; // Propagate the error to handle it in the component
  }
};

export const getVisibleItems = (
  currentPage,
  itemsPerPage,
  allIngredients,
  searchQuery,
  ingredient
) => {
  if (searchQuery !== "" && ingredient) {
    return [ingredient];
  } else {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allIngredients.slice(startIndex, startIndex + itemsPerPage);
  }
};

export const calculateTotalPages = (allIngredients, itemsPerPage) => {
  return Math.ceil(allIngredients.length / itemsPerPage);
};

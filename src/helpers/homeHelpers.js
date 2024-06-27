// helpers/homeHelpers.js
import ingredientService from "../apis/ingredient";
import recipeService from "../apis/recipe";

export const getObjectById = (id, images) => {
  return images.find((item) => item.id === id);
};

export const fetchAllIngredients = async (
  addAllListIngredientHook,
  setCategories
) => {
  try {
    const res = await ingredientService.getAll();
    if (res) {
      addAllListIngredientHook(res.data);
      const uniqueCategories = [
        ...new Set(res.data.map((ingredient) => ingredient.category)),
      ];
      setCategories(uniqueCategories);
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const searchRecipeByIngredients = async (
  selectedIngredients,
  ingredientNames,
  saveSearchedRecipes,
  navigate,
  name_proyect,
  showNewMessage
) => {
  try {
    if (selectedIngredients.length > 0) {
      const specificSearch = await recipeService.getByIng(ingredientNames);
      const eqOrLess = await recipeService.getEqOrLess(ingredientNames);

      if (specificSearch && eqOrLess) {
        const updatedResponse = {
          ...specificSearch,
          tipo: "Exacto",
        };

        const responseEq = {
          ...eqOrLess,
          tipo: "Eq",
        };

        // Crear un array con ambos resultados
        const combinedResponses = [updatedResponse, responseEq];

        // Guarda el array combinado en el estado
        saveSearchedRecipes(combinedResponses);

        // Navega a la página de búsqueda de recetas
        navigate(name_proyect + "/recipe/search");
      } else {
        showNewMessage("warning", "No se pudieron obtener las recetas.");
      }
    } else {
      showNewMessage(
        "warning",
        "Por favor seleccione como mínimo 1 ingrediente"
      );
    }
  } catch (error) {
    console.log(error.message);
    showNewMessage("error", "Error en la llamada a la API");
  }
};

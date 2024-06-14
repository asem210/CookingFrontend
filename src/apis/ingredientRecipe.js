import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined');
}
const ingredientRecipeService = {
  create: async (cantidad, medicion, especificacion, ingrediente_id, receta_id) => {
    try {
      const requestData = {
        cantidad,
        medicion,
        especificacion,
        ingrediente_id,
        receta_id,
      };
      const { data } = await axios.post(BASE_URL + '/ingredienteReceta/create', requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  getOfRecipe: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/ingredienteReceta/getByRecipe/${id}`, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default ingredientRecipeService;

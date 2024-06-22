import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined');
}
const saveRecipeService = {
  getSaveRecipe: async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/recetaGuardadas/getThisUser', {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  create: async (receta_id) => {
    try {
      const requestData = {
        receta_id,
      };
      const { data } = await axios.post(BASE_URL + '/recetaGuardadas/create', requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  delete: async (id) => {
    try {
      const { data } = await axios.delete(BASE_URL + '/recetaGuardadas/delete/' + id, {
        headers: { token: localStorage.token },
      });

      return data;
    } catch (error) {
      return null;
    }
  },

  deleteAllbyRecipe: async (id) => {
    try {
      const { data } = await axios.delete(
        BASE_URL + '/recetaGuardadas/deleteAllbyRecipe/' + id,
        { headers: { token: localStorage.token } }
      );
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default saveRecipeService;

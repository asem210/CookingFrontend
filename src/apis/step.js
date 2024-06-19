import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined');
}

const stepService = {
  create: async (number, name, description, img, receta_id) => {
    try {
      const requestData = {
        number,
        name,
        description,
        img,
        receta_id,
      };
      const { data } = await axios.post(BASE_URL + '/pasos/create', requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getOfRecipe: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/pasos/getById/${id}`, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  deleteStepsOfRecipe: async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/pasos/deleteByRecipe/${id}`, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default stepService;

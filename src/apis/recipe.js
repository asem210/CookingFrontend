import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined');
}

const recipeService = {
  create: async (name, description, img, dificultad, time, porcion, date) => {
    try {
      const requestData = {
        name,
        description,
        img,
        dificultad,
        time,
        porcion,
        date,
      };
      const { data } = await axios.post(BASE_URL + '/receta/create', requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  getOne: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/receta/get/${id}`);
      return data;
    } catch (error) {
      return null;
    }
  },
  getAll: async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/receta/getall');
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default recipeService;

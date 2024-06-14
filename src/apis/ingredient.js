import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined');
}
const ingredientService = {
  getAll: async (params) => {
    try {
      const { data } = await axios.get(BASE_URL + '/ingrediente/get', {
        params: params,
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getOne: async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/ingrediente/get/${id}`);
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default ingredientService;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL is not defined");
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
      const { data } = await axios.post(
        BASE_URL + "/receta/create",
        requestData,
        {
          headers: { token: localStorage.token },
        }
      );
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

  getByIng: async (ingredientes) => {
    try {
      const requestData = { ingredientes };
      const { data } = await axios.post(
        `${BASE_URL}/receta/getByIng`,
        requestData
      );
      return data;
    } catch (error) {
      console.error("Error al buscar recetas por ingredientes:", error);
      return null;
    }
  },

  getAll: async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/receta/getall");
      return data;
    } catch (error) {
      return null;
    }
  },

  getAllOfUser: async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/receta/getThisUser", {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  editRecipe: async (
    id,
    description,
    img,
    name,
    dificultad,
    time,
    porcion,
    date
  ) => {
    try {
      const requestData = {
        description,
        img,
        name,
        dificultad,
        time,
        porcion,
        date,
      };
      const { data } = await axios.patch(
        BASE_URL + "/receta/edit/" + id,
        requestData,
        {
          headers: { token: localStorage.token },
        }
      );
      return data;
    } catch (error) {
      return null;
    }
  },

  deleteRecipe: async (id) => {
    try {
      const { data } = await axios.delete(`${BASE_URL}/receta/delete/${id}`, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default recipeService;

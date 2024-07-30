import axios from "axios";
import { expirationTime } from "../utils/dateUtils";
const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("BASE_URL is not defined");
}

const userService = {
  getAll: async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/auth/getall");
      return data;
    } catch (error) {
      return null;
    }
  },

  getByEmail: async (email) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/getByEmail/${email}`);
      return data;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  },

  getThisUser: async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/auth/getThis", {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  verify: async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/auth/verify", {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  createGoogle: async (email, name, surname, image, username) => {
    try {
      const requestData = {
        name,
        surname,
        email,
        image,
        username,
      };
      const { data } = await axios.post(
        BASE_URL + "/auth/register/google",
        requestData
      );
      return data;
    } catch (error) {
      return null;
    }
  },

  loginGoogle: async (email) => {
    try {
      const requestData = {
        email,
      };
      const { data } = await axios.post(
        BASE_URL + "/auth/login/google",
        requestData
      );
      if (data.success) {
        const token = data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("timeExpired", JSON.stringify(expirationTime(60)));
      }

      return data;
    } catch (error) {
      return null;
    }
  },

  login: async (email, password) => {
    try {
      const requestData = {
        email,
        password,
      };
      const { data } = await axios.post(BASE_URL + "/auth/login", requestData);

      if (data.success) {
        const token = data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("timeExpired", JSON.stringify(expirationTime(60)));
      }

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

  register: async (name, surname, email, password, phone, image, username) => {
    try {
      const requestData = {
        name,
        surname,
        email,
        password,
        phone,
        image,
        username,
      };
      const { data } = await axios.post(
        BASE_URL + "/auth/register",
        requestData
      );
      return data;
    } catch (error) {
      return null;
    }
  },

  edit: async (name, surname, phone, image) => {
    try {
      const requestData = {
        name,
        surname,
        phone,
        image,
      };
      const { data } = await axios.patch(BASE_URL + "/auth/edit", requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  editTWO: async (name, surname, phone, image) => {
    try {
      const requestData = {
        name,
        surname,
        phone,
        image,
      };
      const { data } = await axios.patch(BASE_URL + "/auth/edit", requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  delete: async () => {
    try {
      const { data } = await axios.delete(BASE_URL + "/auth/delete", {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default userService;

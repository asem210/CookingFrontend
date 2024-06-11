import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined');
}

const userService = {
  getAll: async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/auth/getall');
      return data;
    } catch (error) {
      return null;
    }
  },

  getThisUser: async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/auth/getThis', {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  verify: async () => {
    try {
      const { data } = await axios.get(BASE_URL + '/auth/verify', {
        headers: { token: localStorage.token },
      });
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
      const { data } = await axios.post(BASE_URL + '/auth/login', requestData);

      if (data.success) {
        const token = data.data.token;
        localStorage.setItem('token', token);
      }

      return data;
    } catch (error) {
      console.log(error.message);
    }
  },

  register: async (name, surname, email, password, phone, image) => {
    try {
      const requestData = {
        name,
        surname,
        email,
        password,
        phone,
        image,
      };
      const { data } = await axios.post(BASE_URL + '/auth/register', requestData);
      return data;
    } catch (error) {
      return null;
    }
  },

  edit: async (name, surname, phone) => {
    try {
      const requestData = {
        name,
        surname,
        phone,
      };
      const { data } = await axios.patch(BASE_URL + '/auth/edit', requestData, {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  delete: async () => {
    try {
      const { data } = await axios.delete(BASE_URL + '/auth/delete', {
        headers: { token: localStorage.token },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default userService;

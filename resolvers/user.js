const classApi = require('../api');

const API = new classApi();

module.exports = {
  Query: {
    users: async (_, args) => {
      const {
        data: { data }
      } = await API.getUsers();
      return data;
    },

    user: async (_, { id }) => {
      const {
        data: { data }
      } = await API.getUser(id);

      return data;
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const { data } = await API.register({
        email,
        password
      });

      return data;
    }
  }
};

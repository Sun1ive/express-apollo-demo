const axios = require('axios');

module.exports = class Api {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://reqres.in',
      credentials: false
    });
  }

  getUsers() {
    return this.client.get('/api/users', {
      params: {
        page: 1
      }
    });
  }

  getUser(id) {
    return this.client.get(`/api/users/${id}`);
  }

  register({ email, password }) {
    return this.client.post('/api/register', {
      email,
      password
    });
  }
};

import Http from "./clients/AxiosClient";
const resource = "/auth";

export default {
  async login(payload) {
    return Http.post(`${resource}/login`, payload);
  },

  async register(payload) {
    return Http.post(`${resource}/register`, payload);
  },

  async logout() {
    return Http.post(`${resource}/logout`);
  },
};
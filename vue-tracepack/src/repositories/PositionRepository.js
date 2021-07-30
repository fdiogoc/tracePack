import Http from "./clients/AxiosClient";
const resource = "/positions";

export default {
  get() {
    return Http.get(`${resource}`);
  },
  create(payload) {
    return Http.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Http.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Http.delete(`${resource}/${id}`);
  },
};
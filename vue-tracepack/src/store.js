import { createStore } from "vuex";
import Repository from "./repositories/RepositoryFactory";
const PositionRepository = Repository.get("position");
const PolygonRepository = Repository.get("polygon");
const AuthRepository = Repository.get("auth");

const store = createStore({
  state: {
    polygons: [],
    positions: [],
    user: [],
    token: localStorage.getItem('token') || '',
    loggedIn: localStorage.getItem('token') ? true : false
  },

  actions: {
    async getPositions({ commit }) {
      commit("STORE_POSITIONS", await PositionRepository.get());
    },    
    async getPolygons({ commit }) {
      commit("STORE_POLYGONS", await PolygonRepository.get());
    },

    async createPosition({ commit }, payload) {
      commit("STORE_POSITION", await PositionRepository.create(payload));
    },   
     async createPolygon({ commit }, payload) {
      commit("STORE_POLYGON", await PolygonRepository.create(payload));
    },

    async updatePosition({ commit }, { payload, id }) {
      commit("UPDATE_POSITION", await PositionRepository.update(payload, id));
    },
    async updatePolygon({ commit }, { payload, id }) {
      commit("UPDATE_POLYGON", await PolygonRepository.update(payload, id));
    },

    async deletePosition({ commit }, id) {
      const result = await PositionRepository.delete(id);
      if (result) {
        commit("DELETE_POSITION", id);
      }
    },
    async deletePolygon({ commit }, id) {
      const result = await PolygonRepository.delete(id);
      if (result) {
        commit("DELETE_POLYGON", id);
      }
    },

    async login({ commit }, payload) {
      commit("STORE_LOGGED_IN_USER", await AuthRepository.login(payload));
    },

    async logout({ commit }) {
      try {
        // await AuthRepository.logout();

        commit("STORE_LOGGED_OUT_USER", true);
        return true;
      } catch (error) {
        console.log(error);
      }
      return false;
    },

    async register({ commit }, payload) {
      return await AuthRepository.register(payload);
    },
  },

  mutations: {
    STORE_LOGGED_IN_USER: (state, response) => {
      const { data } = response;
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        state.user = data.user;
        state.token = data.token;
        state.loggedIn = true;
      }
    },

    STORE_POSITIONS: (state, response) => {
      const { data } = response;
      state.positions = data;
    },

    STORE_POSITION: (state, response) => {
      const { data } = response;
      state.positions.push(data);
    },

    UPDATE_POSITION: (state, response) => {
      const { data } = response;
      const index = state.positions.findIndex((position) => position.id == data.data.id);
      state.positions[index] = data.data;
    },

    DELETE_POSITION: (state, id) => {
      const index = state.positions.findIndex((position) => position.id == id);
      state.positions.data.splice(index, 1);
    },

    STORE_POLYGONS: (state, response) => {
      const { data } = response;
      state.polygons = data;
    },

    STORE_POLYGON: (state, response) => {
      const { data } = response;
      state.polygons.push(data);
    },

    UPDATE_POLYGONS: (state, response) => {
      const { data } = response;
      const index = state.polygons.findIndex((poly) => poly.id == data.data.id);
      state.polygons[index] = data.data;
    },

    DELETE_POLYGONS: (state, id) => {
      const index = state.polygons.findIndex((poly) => poly.id == id);
      state.polygons.data.splice(index, 1);
    },


    STORE_LOGGED_OUT_USER: (state, response) => {
      if (response) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.user = {};
        state.token = null;
        state.insights = null;
        state.loggedIn = false;
      }
    },
  },

  getters: {
    getPosition: (state) => (id) => {
      return state.positions.find((event) => event.id == id);
    },
    getPolygon: (state) => (id) => {
      return state.polygons.find((event) => event.id == id);
    },
    isLoggedIn: state => !!state.token,
  },

  // strict: true
});

export default store;
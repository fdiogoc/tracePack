<template>
  <nav class="flex bg-green-700 flex-wrap items-center justify-between p-4">
    <div class="w-auto order-2">
      <a class="text-xl text-gray-800 font-semibold font-heading" href="#">
        TracePack
      </a>
    </div>

    <div class="navbar-menu order-1 w-3/5">
      <router-link
        class="inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-gray-300"
        id="home"
        to="/"
        >Mapa</router-link
      >

      <router-link
        v-if="loggedIn"
        class="inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-gray-300"
         to="/position"
        > + Posição</router-link
      >
      <router-link
        v-if="loggedIn"
        class="inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-gray-300"
          to="/polygon"
        > + Polígono</router-link
      >

      <router-link
        v-if="!loggedIn"
        class="inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-gray-300"
        to="/login"
        >Login</router-link
      >

      <router-link
        v-if="!loggedIn"
        class="inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-gray-300"
        to="/register"
        >Registrar</router-link
      >

      <router-link
        v-if="loggedIn"
        class="inline-block mt-4 lg:mt-0 mr-10 text-white hover:text-gray-300"
        to
        @click="logout"
        >Logout</router-link
      >
    </div>
  </nav>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from 'vue'
export default {

  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = async () => {
      await store.dispatch("logout").then(() => {
          router.push('/login')
        });
    };
    return {

      loggedIn: computed(() => store.getters.isLoggedIn),
      logout,
    };
  },
};
</script>
<template>
  <div class="bg-green-100 min-h-screen">
    <Header></Header>
    
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import { useStore } from "vuex";
export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const dispatchEvents = () => {
        store.dispatch("getPositions")
        store.dispatch("isLoggedIn")
      };
    dispatchEvents();
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>

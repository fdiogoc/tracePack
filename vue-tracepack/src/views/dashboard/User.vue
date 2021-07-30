<template>
  <div class="text-center banner">
    <div class="container p-5">
      <div class="p-5">
        <h1>User DashBoard</h1>
      </div>
    </div>

    <br /><br />


  </div>
</template>

<script>
import { mapState, useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "User",
  components: { },
  setup() {
    // const store = useStore();
    // const getUserEvents = () =>
    //   store.dispatch("getUserEvents", store.state.user.id);
    // const userevents = computed(() => store.state.userevents);
    // getUserEvents();
    // return {
    //   getUserEvents,
    //   userevents,
    //};
  },
};
</script>

<style lang="sass" scoped></style>
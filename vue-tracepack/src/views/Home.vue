<template>
  <div class="text-center banner">
    <div class="container p-5 mx-auto">
      <div class="p-5">
        <h1>TrackPack Teste <p>
            
            </p></h1>
       
      </div>
    </div>
    <div class="container pb-5 mx-auto">
      <Map />
    </div>
  </div>
</template>


<script>
import Map from "../components/Map.vue";
export default {
  components: {
    Map,
  },
};
</script>
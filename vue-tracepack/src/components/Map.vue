<template>
  <div>
    <div class="flex flex-wrap mb-10 justify-center">
      <label class="sm:mr-10 text-gray-700" for="position">
        Posição
        <select
          id="position"
          class="
            block
            w-52
            py-2
            px-3
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            focus:outline-none
            focus:ring-primary-500
            focus:border-primary-500
          "
          name="animals"
        >
          <option value="">Selecione uma posição</option>
          <option
            v-for="(position, i) in positionsList"
            :key="i"
            value="polygon.id"
          >
            {{ position.name }}
          </option>
        </select>
      </label>

      <label class="text-gray-700" for="polygon">
        Polígono
        <select
          id="polygon"
          class="
            block
            w-52
            py-2
            px-3
            border border-gray-300
            bg-white
            rounded-md
            shadow-sm
            focus:outline-none
            focus:ring-primary-500
            focus:border-primary-500
          "
          name="animals"
        >
          <option value="">Selecione um Polígono</option>
          <option v-for="(polygon, i) in polygonsList" :key="i" value="pos.id">
            {{ polygon.name }}
          </option>
        </select>
      </label>
    </div>
    <l-map :zoom="zoom" :center="center" style="height: 500px" class="w-full">
      <l-tile-layer :url="url" :attribution="attribution" />

      <l-geo-json
        :geojson="position.json"
        :options="options"
        v-for="(position, i) in positionsList"
        :key="i"
      />

      <!-- 
      <l-geo-json
        :geojson="polygon.json"
        v-for="(polygon, i) in polygonsList"
        :key="i"
      /> -->
      <l-geo-json
        :geojson="polygon.json"
        v-for="(polygon, i) in polygonsList"
        :key="i"
        :options="getStyle(polygon.color)"
      >
        <l-popup>
          {{ polygon.name }}
        </l-popup>
            <l-tooltip>
         {{ polygon.name }}
        </l-tooltip>
      </l-geo-json>

      <!-- <l-marker :lat-lng="marker" />
          <l-marker :lat-lng="[0, 0]" draggable >
        <l-tooltip>
          lol
        </l-tooltip>
      </l-marker> -->
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson,
  LPopup,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LPopup,
    LTooltip,
  },

  data() {
    return {
      zoom: 7,
      center: [-23.304453, -51.169582],
      geojson: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(-23.304453, -51.169582),

    };
  },
  setup() {
    const store = useStore();
    const positionsList = computed(() => store.state.positions);
    const polygonsList = computed(() => store.state.polygons);

    return {
      positionsList,
      polygonsList,
    };
  },

    methods: {
    getStyle(color) {
     return {
        weight: 1,
        color: "#ECEFF1",
        opacity: 0.4,
        fillColor: color ?? '#adad',
        fillOpacity: 0.4,
     }
    }
  }
};
</script>
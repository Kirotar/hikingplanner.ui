<template>
   <div id="app" class="dropdown text-center mb-4" >
    <button class="dropbtn btn btn-success" @click="dropdownVisibility = !dropdownVisibility"
    >Vali matkarada</button>
    <div class="dropdown-content" v-if="dropdownVisibility">
      <a v-for="trail in store.hikingTrails" :key="trail.id" @click="selectTrail(trail)">
        {{ trail.name }}
      </a>
    </div>
  </div>
</template>

<script>
import { useHikeStore } from "@/store/hikeStore";
import { ref } from "vue";

export default {
  setup() {
    const store = useHikeStore();
    const dropdownVisibility = ref(false);

    store.fetchTrails();

    const selectTrail = (trail) => {
      if (trail) {
        store.newHike.template = {id: trail.id};
        store.newHike.trailName = trail.name;
      } else {
        store.newHike.template = {id: null, name: ""};
        store.newHike.trailName = "";
      }
      dropdownVisibility.value = false;
    };

    return {store, dropdownVisibility, selectTrail};
  },
};
</script>

<style scoped>
.dropbtn {
  background-color: #4CAF50; /* Default background color */
  border: none;
  color: white; /* Text color */
  padding: 10px 20px; /* Padding for button size */
  font-size: 20px; /* Font size */
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.3s ease; /* Smooth transition */
  text-align: left;
}

.dropbtn:hover {
  background-color: #45a049; /* Darker green on hover */
}

.dropdown-content a {
  padding: 8px 16px;
  display: block;
  color: black;
  text-decoration: none;
  text-align: left;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.dropdown-content {
  display: block; /* Start with the dropdown content hidden by v-show */
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Ensure dropdown appears above other content */
  max-height: 300px; /* Limit height */
  overflow-y: auto; /* Scroll if content overflows */
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

</style>
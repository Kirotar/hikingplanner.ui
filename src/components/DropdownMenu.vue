<template>
  <div class="dropdown text-center mb-4" >
    <button class="dropbtn btn btn-success btn-lg" @click="store.toggleDropdownVisibility()">Vali matkarada</button>
    <div class="dropdown-content" v-if="store.isDropdownVisible">
      <a v-for="trail in store.hikingTrails" :key="trail.id" @click="store.selectTrail(trail)">
        {{ trail.name }}
      </a>
    </div>
  </div>
</template>

<script>
import {useHikeStore} from "@/store/hikeStore";

  export default {
    setup() {
      const store = useHikeStore();
      store.fetchTrails();
      return { store };
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
 }

.dropbtn:hover {
  background-color: #45a049; /* Darker green on hover */
}

.dropdown-content a {
  padding: 8px 16px;
  display: block;
  color: black;
  text-decoration: none;
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
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}


</style>

<template>
  <div id="App">
    <h1>Tehtud matkad</h1>
    <br>
    <!-- Dropdown to select trail -->
    <Dropdown/>
    <br>
    <!-- Add Hike form -->
    <PastHikeForm/>
    <!-- Button to fetch hikes -->
    <div id="App">
      <button @click="store.fetchHikesAndToggle" class="btn green-btn">Tehtud matkad</button>
    </div>
    <!-- Display list of hikes -->
    <PastHikeList/>
  </div>
  <br>
  <br>
  <br>
</template>

<script>
import Dropdown from "@/components/DropdownMenu.vue";
import PastHikeForm from "@/components/PastHikeForm.vue";
import {useHikeStore} from "@/store/hikeStore";
import PastHikeList from "@/components/PastHikeList.vue";

export default {
  setup() {
    const store = useHikeStore();
    return { store };
  },
  components: {
    PastHikeList,
    PastHikeForm,
    Dropdown
  },
};

</script>

<style>
.green-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}
.green-btn:hover {
  background-color: #45a049;
}

</style>

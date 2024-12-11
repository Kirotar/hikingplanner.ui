<template>
  <div id="app">
    <h1>Tehtud matkad</h1>
    <br>
    <!-- Dropdown to select trail -->
    <Dropdown/>
    <br>
    <!-- Add Hike form -->
    <PastHikeForm/>
    <!-- Button to fetch hikes -->
    <div id="app">
      <button @click="store.fetchHikesAndToggle" class="btn green-btn">Tehtud matkad</button>
    </div>
    <!-- Display list of hikes -->
    <PastHikeList/>
  </div>
  <br>
  <br>
  <br>
  <div>
    <h3>Minu saavutused matkal</h3>
    <br>
    <br>
    <GoalsAndAchievementsForm/>
    <br>
  </div>
</template>

<script>
import Dropdown from "@/components/DropdownMenu.vue";
import PastHikeList from "@/components/HikeList.vue";
import PastHikeForm from "@/components/PastHikeForm.vue";
import {useHikeStore} from "@/store/hikeStore";
import GoalsAndAchievementsForm from "@/components/GoalsAndAchievementsForm.vue";

export default {
  setup() {
    const store = useHikeStore();
    return { store };
  },
  components: {
    GoalsAndAchievementsForm,
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

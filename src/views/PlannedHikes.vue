<template>
  <div id="App" class="planned-container">
    <h1>Planeeritud matkad</h1>
    <div id="app">
    <button @click="store.fetchFutureHikesAndToggle" class="btn green-btn">Planeeritud matkad</button>
    </div>
    <PlannedHikeList/>

<!--
    <h3>Planeeri uus matk: </h3>
-->
<!--        <DropdownMenu/>
<PlannedHikeFormTwo/>-->
<!--    <br>-->
<!--    <br>-->
<!--    <br>-->
    <PlannedHikeForm/>
  </div>
</template>

<script>
import {useHikeStore} from "@/store/hikeStore";
import PlannedHikeForm from "@/components/PlannedHikeForm.vue";
import PlannedHikeList from "@/components/PlannedHikeList.vue";

export default {
  components: {
    PlannedHikeList,
    PlannedHikeForm,
    //DropdownMenu,
    // PlannedHikeFormTwo,
     /*PlannedHikeForm*/
  },

  setup() {
    const store = useHikeStore();
    return { store };
  },
};
</script>

<style>
.planned-container {
  width: 100%; /* Full width */
  max-width: 520px; /* Adjust based on your design */
  margin: 0 auto;
  padding: 0px; /* Add padding if needed */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

.planned-container h1 {
  font-family: "Fira Code", serif;
  font-optical-sizing: auto;
  color: #372003;
}

.dropdown-menu .form-check {
  margin-bottom: 10px;
}

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

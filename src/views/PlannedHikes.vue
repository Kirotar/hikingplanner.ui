<template>
  <div id="app" class="planned-container">
    <h1>Planeeritud matkad</h1>
    <div id="app">
    <button @click="store.fetchFutureHikesAndToggle" class="btn green-btn">Planeeritud matkad</button>
    </div>
    <PlannedHikeList/>
    <br>
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
    PastHikeList, /*PlannedHikeForm*/
  },

  setup() {
    const store = useHikeStore();
    return { store };
  },
};
</script>

<style>
.planned-container {
  padding: 20px;
  text-align: left;
  display: flex;
  align-items: center;

}

.planned-container h1 {
  font-family: "Lora", serif;
  font-size: 2.5rem;
  line-height: 1.2;
  color: #faebd7;
  margin-bottom: 20px;
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

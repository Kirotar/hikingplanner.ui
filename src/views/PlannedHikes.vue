<template>
  <div class="planned-container">
    <h1>Planeeritud matkad</h1>
    <button @click="store.fetchFutureHikesAndToggle" class="btn green-btn">Planeeritud matkad</button>
    <PastHikeList/>
    <br>
    <br>
    <br>
    <br>
    <DropdownMenu/>
    <PlannedHikeFormTwo/>
    <br>
    <br>
    <br>
<PlannedHikeForm/>
  </div>
</template>

<script>/*
import PlannedHikeForm from "@/components/PlannedHikeForm.vue";
*/
import PastHikeList from "@/components/HikeList.vue";
import {useHikeStore} from "@/store/hikeStore";
import PlannedHikeFormTwo from "@/components/PlannedHikeFormTwo.vue";
import DropdownMenu from "@/components/DropdownMenu.vue";
import PlannedHikeForm from "@/components/PlannedHikeForm.vue";

export default {
  components: {
    PlannedHikeForm,
    DropdownMenu,
    PlannedHikeFormTwo,
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
}

.planned-container h1 {
  font-family: "Lora", serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #faebd7;
  margin-bottom: 20px;
}

.form-control {
  width: 80%;
  max-width: 500px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 500px;
}

.dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 10px;
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

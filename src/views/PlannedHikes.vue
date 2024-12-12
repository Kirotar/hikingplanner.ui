<template>
  <div id= "App">
    <h1>Planeeritud matkad</h1>
    <div >
    <button @click="store.fetchFutureHikesAndToggle" class="btn green-btn">Planeeritud matkad</button>
    </div>
<!--    <PastHikeList/>-->
    <br>
    <br>
    <br>
    <br>
    <PlannedHikeForm/>
  </div>
</template>

<script>/*
import PlannedHikeForm from "@/components/PlannedHikeForm.vue";
*/
import {useHikeStore} from "@/store/hikeStore";
// import PlannedHikeFormTwo from "@/components/PlannedHikeFormTwo.vue";
//import DropdownMenu from "@/components/DropdownMenu.vue";
import PlannedHikeForm from "@/components/PlannedHikeForm.vue";

export default {
  components: {
    PlannedHikeForm,
    //DropdownMenu,

  },

  setup() {
    const store = useHikeStore();
    return { store };
  },
};
</script>

<style>

</style>

<template>
  <div class="container mt-4 rounded-5 custom-bg">
    <form @submit.prevent="store.addHikeWithChecklist()" class="row mb-3">
      <div class="form-group mb-3">

        <input v-model="store.newHike.trailName" placeholder="Matkarada" class="form-control col" required
               readonly/>
      </div>
      <div class="form-group mb-3">
        <input type="date" v-model="store.newHike.startDate" class="form-control col" required/>
      </div>
      <div class="form-group mb-3">
        <input type="text" placeholder="Kohtumispaik"
               v-model="store.newHike.meetupPoint" class="form-control col" required/>
      </div>
      <PlannedChecklist/>

      <button class="btn btn-success w-100 col btn-lg">Lisa matk</button>
    </form>
  </div>
</template>

<script>
import {useHikeStore} from "@/store/hikeStore";
import PlannedChecklist from "@/components/PlannedChecklist.vue";

export default {
  components: {PlannedChecklist},
  setup() {
    const store = useHikeStore();

    return {store,};
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}


</style>
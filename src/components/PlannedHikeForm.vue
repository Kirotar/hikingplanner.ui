<template>
  <div>
    <h3>Planeeri uus matk</h3>
    <form @submit.prevent="store.addHikeWithChecklist()" class="planned-form">
      <div class="form-group mb-2">
        <label for="trailDropdown">Matkaraja valik:</label>
        <select
            id="trailDropdown"
            class="form-control"
            v-model="selectedTrail"
            @change="store.selectTrail(selectedTrail)"
        >
          <option disabled value="">Vali matkarada</option>
          <option v-for="trail in store.hikingTrails" :key="trail.id" :value="trail">
            {{ trail.name }}
          </option>
        </select>
      </div>
      <input
          type="text"
          v-model="store.newHike.trailName"
          placeholder="Matkarada"
          class="form-control"
          readonly
      />
      <input
          type="text"
          v-model="store.newHike.meetupPoint"
          placeholder="Kohtumispaik"
          class="form-control"
          required
      />
      <input type="date" v-model="store.newHike.startDate" class="form-control" required />

      <PlannedChecklist/>

      <br>
      <div>
        <button class="btn btn-success w-50 btn-lg">Lisa matk</button>
      </div>
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
    store.fetchTrails();

    let selectedTrail = null;
    const addHike = async () => {
      await store.addHike();
    };
    return {store, selectedTrail, addHike};
  },
}
</script>


<style scoped>
/* kontrollib matkaraja valik: kastikesi*/
.form-control {
  width: 200%;
  max-width: 500px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
  align-items: center;
}
</style>

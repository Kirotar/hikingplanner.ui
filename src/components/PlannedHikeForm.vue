<template>
  <div class="container mt-4 rounded-5 custom-bg">
    <form @submit.prevent="store.addHikeWithChecklist()" class="planned-form mb-3">
      <div class="form-group mb-3">
        <label for="trailDropdown" class="form-label"></label>
        <select
            id="trailDropdown"
            class="form-control"
            v-model="selectedTrail"
            @change="store.selectTrail(selectedTrail)"
            required
        >
          <option disabled value="">Vali matkarada</option>
          <option v-for="trail in store.hikingTrails" :key="trail.id" :value="trail">
            {{ trail.name }}
          </option>
        </select>
      </div>

      <div class="form-group mb-3">
        <input
            type="text"
            v-model="store.newHike.trailName"
            placeholder="Matkarada"
            class="form-control"
            readonly
        />
      </div>

      <div class="form-group mb-3">
        <input
            type="text"
            v-model="store.newHike.meetupPoint"
            placeholder="Kohtumispaik"
            class="form-control"
            required
        />
      </div>

      <div class="form-group mb-3">
        <input
            type="date"
            v-model="store.newHike.startDate"
            class="form-control"
            required
        />
      </div>

      <PlannedChecklist />

      <div class="text-center">
        <button class="btn green-btn btn-lg mt-3">Lisa matk</button>
      </div>
    </form>
  </div>
</template>
<script>
import { useHikeStore } from "@/store/hikeStore";
import PlannedChecklist from "@/components/PlannedChecklist.vue";

export default {
  components: { PlannedChecklist },
  setup() {
    const store = useHikeStore();
    store.fetchTrails();

    let selectedTrail = ""; // Ensure this is initialized to match the placeholder value

    const addHike = async () => {
      await store.addHike();
    };

    return { store, selectedTrail, addHike };
  },
};
</script>

<style>

</style>

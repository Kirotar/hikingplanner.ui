<template>
  <div class="container mt-4 rounded-5 custom-bg">
    <!-- Start of white background container -->
    <div class="form-container">
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
        <br>
        <div class="text-center">
          <button class="btn green-btn mt-3 btn-lg">Lisa matk</button>
        </div>
      </form>
    </div>
    <!-- End of white background container -->
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
/* Match the styles from the first example */
.form-container {
  max-width: 10000px; /* Adjust width for consistency */
  background-color: rgba(255, 255, 255, 0.7); /* White background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

/* Button Styling */
.green-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.green-btn:hover {
  background-color: #56a045;
}

.btn-lg {
  font-size: 1.25rem; /* Make the button slightly larger */
  padding: 12px 24px;
}
</style>
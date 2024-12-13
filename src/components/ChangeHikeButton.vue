<template>

  <button
      class="btn primary"
      @click="visibility = !visibility"
  >
    Muuda matka
  </button>
  <div v-if="visibility">
    <form class="mb-3">
      <div class="form-group mb-3">
        <input
            v-model="hike.notes"
            placeholder="Märkmed"
            class="form-control"
        />
      </div>
      <div class="form-group mb-3">
        <input
            v-model="hike.duration"
            type="text"
            class="form-control"
            placeholder="Kaua matk kestis (HH:MM)"
        />
      </div>
      <div class="form-group mb-3">
        <input
            v-model="hike.meetupPoint"
            placeholder="Kohtumispaik"
            class="form-control"
        />
      </div>
      <div class="form-group mb-3">
        <input
            v-model="hike.startDate"
            type="date"
            class="form-control"
            required
        />
      </div>
      <div class="form-group mb-3">
        <input
            v-model="hike.endDate"
            type="date"
            class="form-control"
            required
        />
      </div>
      <div>
        <button type="button" class="btn btn-danger" @click="confirmUpdateHike">
          Salvesta muudatused?
        </button>

        <div v-if="showUpdateModal">
          <div class="modal-overlay" @click="showUpdateModal = false"></div>
          <div class="modal">
            <p>Kas olete kindel, et soovid muuta?</p>
            <button class="btn btn-danger" @click="updateHike">Jah</button>
            <button class="btn btn-secondary" @click="showUpdateModal = false">Ei</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { defineProps } from "vue";

// Props to accept hike ID
const props = defineProps({
  hikeId: {
    type: Number,
    required: true,
  },
});

// Reactive variables
const showUpdateModal = ref(false);
const visibility = ref(false);
const hike = ref({
  id: props.hikeId,
  notes: "",
  duration: "",
  meetupPoint: "",
  startDate: "",
  endDate: "",
});

// Confirm update modal
const confirmUpdateHike = () => {
  showUpdateModal.value = true;
};

// Update hike in the back-end
const updateHike = async () => {
  try {
    await axios.put(`${this.api}/${props.hikeId}/update`, hike.value);
    alert("Hike updated successfully!");
    showUpdateModal.value = false;
  } catch (error) {
    console.error(`Error updating hike ${props.hikeId}:`, error);
    alert("Failed to update the hike. Please try again.");
  }
};
</script>



<style scoped>
/* Button styles */
.btn {
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px; /* Set a smaller width */
  background: white;
  padding: 20px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for better appearance */
  display: block;
  text-align: center; /* Center-align text */
  max-height: 200px; /* Limit the height of the modal */
  overflow: auto; /* Add scrolling if the content exceeds the max height */
}

.modal p {
  margin-bottom: 15px; /* Add spacing between text and buttons */
}

.modal button {
  margin: 5px; /* Add spacing between buttons */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Slightly dark background to focus on the modal */
  z-index: 999;
}

</style>
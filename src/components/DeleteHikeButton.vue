
<template>
  <div>
    <button class="btn btn-danger" @click="confirmDeleteHike">
      Kustuta matk
    </button>

    <div v-if="showDeleteModal">
      <div class="modal-overlay" @click="showDeleteModal = false"></div> <!-- Click on overlay to close -->
      <div class="modal">
        <p>Kas olete kindel, et soovite selle matka kustutada?</p>
        <button class="btn btn-danger" @click="deleteHike(selectedHikeId)">Kustuta</button>
        <button class="btn btn-secondary" @click="showDeleteModal = false">Tühista</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useHikeStore} from "@/store/hikeStore";
import axios from "axios";
import { defineProps } from 'vue'


const props = defineProps ({
  hikeId: {
    type: Number,
    required: true
  }
});

const store = useHikeStore();
const showDeleteModal = ref(false); // Modal visibility state
const selectedHikeId = ref(null); // Selected hike ID for deletion
const api = "http://localhost:8091/api/matk";


const confirmDeleteHike=()=> {
const hike = store.hikes.find((h) => h.id === props.hikeId);

if (hike && hike.checklist && hike.checklist.length > 0) {
alert("Palun kustutage kõik 'Asjad kaasa' üksused enne matka kustutamist.");
return; // Exit the function, do not show the modal
}
selectedHikeId.value = props.hikeId;
showDeleteModal.value = true;
};

const deleteHike = async () => {
  try {
    await axios.delete(`${api}/${selectedHikeId.value}/delete-hike`);
  } catch (error) {
    console.error(`Error deleting hike ${selectedHikeId.value}:`, error);
  }
  showDeleteModal.value = false;
  await store.fetchPastHikes()
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

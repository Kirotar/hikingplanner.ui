<template>
  <div>
    <div v-if="store.isVisible">
      <div v-for="hike in store.hikes" :key="hike.id" class="hike-info">
        <button @click="store.toggleVisibility(hike.id)" class="btn green-btn">
          {{ hike.template.name }} - {{ hike.startDate }}
        </button>
        <div v-if="store.isDetailsVisible(hike.id)" class="hike-details-mobile">
          <div class="mobile-responsive-table">
            <div class="table-row">
              <div class="table-cell label">Matkarada</div>
              <div class="table-cell value">{{ hike.template.name }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell label">Alguskuupäev</div>
              <div class="table-cell value">{{ hike.startDate }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell label">Lõpukuupäev</div>
              <div class="table-cell value">{{ hike.endDate }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell label">Kestvus</div>
              <div class="table-cell value">{{ hike.duration }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell label">Kohtumispaik</div>
              <div class="table-cell value">{{ hike.meetupPoint }}</div>
            </div>
            <div class="table-row">
              <div class="table-cell label">Märkmed</div>
              <div class="table-cell value">{{ hike.notes }}</div>
            </div>

            <div class="table-row checklist-section">
              <div class="table-cell label">Asjad kaasa</div>
              <div class="table-cell value">
                <ul class="checklist-mobile">
                  <li v-for="item in hike.checklist" :key="item.id" class="checklist-item">
                    <div class="checklist-item-content">
                      <span class="checklist-name">{{ item.checklistItem.name }}</span>
                      <div class="checklist-actions">
                        <button
                            :class="item.is_completed ? 'btn btn-success' : 'btn btn-secondary'"
                            @click="toggleChecklistItem(item)"
                        >
                          {{ item.is_completed ? "Tehtud!" : "Tegemata" }}
                        </button>

                        <button
                            class="btn btn-danger delete-btn"
                            @click="deleteChecklistItem(item.id, hike.id)"
                        >
                          Kustuta
                        </button>

                      </div>
                    </div>
                  </li>
                </ul>
                <button
                    class="btn btn-warning update-btn"
                    @click="showPlannedChecklist = !showPlannedChecklist"
                    >
                  Lisa
                </button>

                <PlannedChecklist
                    v-if="showPlannedChecklist"
                    @close="showPlannedChecklist = false"
                />
                <button
                    class="btn btn-warning update-btn"
                    @click="handleButtonClick(hike.id); showPlannedChecklist = !showPlannedChecklist"

                >
                  Salvesta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useHikeStore } from "@/store/hikeStore";
import axios from "axios";
import PlannedChecklist from "@/components/PlannedChecklist.vue";

const store = useHikeStore();
const showPlannedChecklist = ref(false);

const toggleChecklistItem = async (item) => {
  try {
    const newStatus = !item.is_completed;

    // Use store method to update backend and local state
    await store.toggleChecklistCompletion(item.id, newStatus);

    // Optional: Persist in local storage if needed
    localStorage.setItem(`checklist_item_${item.id}_completed`, newStatus.toString());
  } catch (error) {
    console.error(`Error toggling checklist item ${item.id}:`, error);
    // Optional: Add user-friendly error notification
  }
};

const deleteChecklistItem = async (itemId, hikeId) => {
  try {
    await axios.delete(`http://localhost:8089/api/matk/delete-items/${itemId}`);
    await store.fetchChecklist(hikeId);
  } catch (error) {
    console.error('Viga kustutamisel:', error);
    // Add error handling, perhaps a toast notification
  }
};
async function handleButtonClick(hikeId) {
  try {
    await store.saveChecklist(hikeId); // Save checklist
    await store.fetchChecklist(hikeId); // Fetch updated checklist
    store.selectedChecklistItems = []; //Reset form

  } catch (error) {
    console.error('Error handling button click:', error);
  }
}

onMounted(() => {
  // Initialize checklist items from local storage more efficiently
  store.hikes.forEach(hike => {
    hike.checklist?.forEach(item => {
      const storedStatus = localStorage.getItem(`checklist_item_${item.id}_completed`);
      if (storedStatus !== null) {
        item.is_completed = storedStatus === 'true';
      }
    });
  });
});
</script>

<style scoped>
/* Mobile-first responsive design */
.mobile-responsive-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-row {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.table-cell {
  display: flex;
  flex-direction: column;
}

.table-cell.label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #006400; /* Dark green for labels */
}

.table-cell.value {
  color: #008000; /* Slightly lighter green for values */
}

.checklist-mobile {
  list-style-type: none;
  padding: 0;
}

.checklist-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  border: 1px solid #e0e0e0;
}

.checklist-item-content {
  display: flex;
  flex-direction: column;
}

.checklist-name {
  margin-bottom: 10px;
  font-weight: 500;
  color: #004d00; /* Darker green for checklist name */
}

.checklist-actions {
  display: flex;
  gap: 10px;
}

/* Responsive adjustments for different screen sizes */
@media (min-width: 576px) {
  .table-row {
    flex-direction: row;
  }

  .table-cell.label {
    flex: 0 0 40%;
    margin-right: 10px;
  }

  .table-cell.value {
    flex: 1;
  }

  .checklist-item-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .checklist-name {
    margin-bottom: 0;
    margin-right: 15px;
  }
}

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

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}
.btn-warning {
  background-color: #4CAF50; /* Green background */
  border-color: #45a049; /* Green border */
  color: white; /* White text */
  font-size: 16px; /* Larger text */
  padding: 10px 20px; /* Add padding */
/*  border-radius: 8px; !* Rounded corners *!*/
}
.btn-warning:hover {
  background-color: darkgreen; /* Darker orange on hover */
}
.delete-btn {
  margin-left: 10px;
}
</style>
Last edited just now
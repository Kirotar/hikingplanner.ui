<template>
  <div id="app">
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
              <div class="table-cell label">CheckList</div>
              <div class="table-cell value">
                <ul class="checklist-mobile">
                  <li v-for="item in hike.checklist" :key="item.id" class="checklist-item">
                    <div class="checklist-item-content">
                      <span class="checklist-name">{{ item.checklistItem.name }}</span>
                      <div class="checklist-actions">
                        <button
                            :class="item.is_completed ? 'btn btn-success' : 'btn btn-danger'"
                            @click="toggleChecklistItem(item)"
                        >
                          {{ item.is_completed ? "Tehtud!" : "Tegemata" }}
                        </button>
                        <button
                            class="btn btn-danger delete-btn"
                            @click="deleteChecklistItem(item.id, hike.id)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHikeStore } from "@/store/hikeStore";
import axios from "axios";

export default {
  setup() {
    const store = useHikeStore();
// Toggle the is_completed status for a checklist item
    const toggleChecklistItem = async (item) => {
      try {
        const newStatus = !item.is_completed; // Toggle the current status

        // Call the store action first to ensure backend is updated
        await store.toggleChecklistCompletion(item.id, newStatus);

        // Update the item status locally
        item.is_completed = newStatus;

        // Persist the completed status in local storage
        localStorage.setItem(`checklist_item_${item.id}_completed`, newStatus.toString());
      } catch (error) {
        console.error(`Error toggling checklist item ${item.id}:`, error);
      }
    };
    // When initializing or loading the component, add a method to check local storage
    const initializeChecklistItems = () => {
      // Find the current hike in the store
      const currentHikes = store.hikes;

      currentHikes.forEach(hike => {
        if (hike.checklist) {
          hike.checklist.forEach(item => {
            const storedStatus = localStorage.getItem(`checklist_item_${item.id}_completed`);
            if (storedStatus !== null) {
              item.is_completed = storedStatus === 'true';
            }
          });
        }
      });
    };
    const deleteChecklistItem = async (itemId, hikeId) => {
      try{
        await axios.delete(`http://localhost:8089/api/matk/delete-items/${itemId}`);
        store.fetchChecklist(hikeId)
      } catch (error) {
        console.error(`Error kustutamisel:`, error);
      }
    }

    return { store, toggleChecklistItem, deleteChecklistItem, initializeChecklistItems };  },
  mounted() {
    this.initializeChecklistItems();
  },
};
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

.delete-btn {
  margin-left: 10px;
}
</style>
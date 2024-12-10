<template>
  <div>
    <div v-if="store.isVisible">
      <div v-for="hike in store.hikes" :key="hike.id" class="hike-info">
        <button @click="store.toggleVisibility(hike.id)" class="btn green-btn">
          {{ hike.template.name }} - {{ hike.startDate }}
        </button>
        <div v-if="store.isDetailsVisible(hike.id)">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>Matkarada</th>
              <th>Alguskuupäev</th>
              <th>Lõpukuupäev</th>
              <th>Kestvus</th>
              <th>Kohtumispaik</th>
              <th>Märkmed</th>
              <th>CheckList</th>
              <th>Eemalda</th>
              <th>Muuda</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ hike.template.name }}</td>
              <td>{{ hike.startDate }}</td>
              <td>{{ hike.endDate }}</td>
              <td>{{ hike.duration }}</td>
              <td>{{ hike.meetupPoint }}</td>
              <td>{{ hike.notes }}</td>
              <td>
                <!-- Checkbox for each checklist item -->
                <ul>
                  <li v-for="item in hike.checklist" :key="item.id">
                    <label :for="`checklist-item-${item.id}`">{{ item.checklistItem.name }}</label>
                    <button
                        :class="item.is_completed ? 'btn btn-success' : 'btn btn-danger'"
                        @click="toggleChecklistItem(item)"
                    >
                      {{ item.is_completed ? "Tehtud!" : "Tegemata" }}
                    </button>
                  </li>
                </ul>

<!--                <ul>
                  <li v-for="item in hike.checklist" :key="item.id">
                    {{ item.checklistItem.name }}
                  </li>
                </ul>-->
              </td>
              <td>
                <button @click="removeProduct(item.name)" class="btn btn-danger"
                        style="background-color:yellowgreen; border-color: antiquewhite;">Eemalda
                </button>
              </td>
              <td>
                <button @click="removeProduct(item.name)" class="btn btn-danger"
                        style="background-color:yellowgreen; border-color: antiquewhite;">Muuda
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHikeStore } from "@/store/hikeStore";

export default {
  setup() {
    const store = useHikeStore();
// Toggle the is_completed status for a checklist item
    const toggleChecklistItem = async (item) => {
      try {
        const newStatus = !item.is_completed; // Toggle the current status
        item.is_completed = newStatus; // Update locally for immediate UI feedback

        // Call the store action with both hikeId and itemId
        await store.toggleChecklistCompletion(item.id, newStatus);
      } catch (error) {
        console.error(`Error toggling checklist item ${item.id}:`, error);
      }
    };

    return { store, toggleChecklistItem };  },
};
</script>

<style scoped>
.green-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.9;
}

</style>

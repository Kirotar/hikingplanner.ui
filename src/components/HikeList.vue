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
                  <li v-for="item in hike.selectedChecklistItems" :key="item.id">
                    <label :for="`checklist-item-${item.id}`">{{ item.checklistItem.name }}</label>
                  </li>
                </ul>

                <ul>
                  <li v-for="item in hike.checklist" :key="item.id">
                    {{ item.checklistItem.name }}
                  </li>
                </ul>
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
    return { store };
  },
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
</style>

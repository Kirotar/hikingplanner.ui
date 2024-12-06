<template>
  <div>
    <div v-if="areHikeDetailsVisible">
      <div v-for="hike in hikes" :key="hike.id" class="hike-info">
        <button @click="toggleDetails(hike.id)" class="btn green-btn">
          {{ hike.template.name }} - {{ hike.startDate }}
        </button>
        <div v-if="isDetailsVisible(hike.id)">
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
        <hr> <!-- Separator for readability -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:  {
    hikes: Array,
    areHikeDetailsVisible: Boolean, // Reacts dynamically to parent state
  },
  data() {
    return {
      visibleHikeId: null  // Initialize to null to start with no visible hike
    };
  },
  methods: {

    // Toggle visibility of details for a specific hike
    toggleDetails(hikeId) {
      this.visibleHikeId = this.visibleHikeId === hikeId ? null : hikeId;
    },
    // Check if the details of a hike should be visible
    isDetailsVisible(hikeId) {
      return this.visibleHikeId === hikeId;
    }
  },
  watch: {
    areHikeDetailsVisible(newVal) {
      if (!newVal) {
        this.visibleHikeId = null; // Reset visible hike when global visibility is toggled off
      }
    },
  }
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
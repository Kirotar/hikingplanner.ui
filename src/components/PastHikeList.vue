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
              <div class="table-cell label">Märkmed</div>
              <div class="table-cell value">{{ hike.notes }}</div>
            </div>
            <DeleteHikeButton
              :hikeId="hike.id"/>
            <ChangeHikeButton :hike-id="hike.id"/>

            </div>

          </div>

        </div>
      </div>
    </div>
</template>
<script setup>
import { useHikeStore } from "@/store/hikeStore";
import DeleteHikeButton from "@/components/DeleteHikeButton.vue";
import ChangeHikeButton from "@/components/ChangeHikeButton.vue";

const store = useHikeStore();

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
  border: none;}
}

</style>

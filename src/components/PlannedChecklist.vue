<template>
  <div class="dropdown">
    <button
        type="button"
        class="btn green-btn dropdown-toggle"
        @click="toggleDropdown"
    >
      Vali Checklist
    </button>
    <div v-show="showChecklistDropdown" class="dropdown-menu">
      <div
          v-for="item in store.checklistItems"
          :key="item.id"
          class="form-check"
      >
        <input
            type="checkbox"
            :id="`checklist-item-${item.id}`"
            :value="item.id"
            v-model="store.selectedChecklistItems"
            class="form-check-input"
        />
        <label :for="`checklist-item-${item.id}`" class="form-check-label">
          {{ item.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"; // Import ref from Vue
import { useHikeStore } from "@/store/hikeStore";

export default {
  setup() {
    const store = useHikeStore();
    store.fetchChecklist();

    // Local state for dropdown visibility
    const showChecklistDropdown = ref(false);

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
      showChecklistDropdown.value = !showChecklistDropdown.value;
    };

    return {
      store,
      showChecklistDropdown,
      toggleDropdown,
    };
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

.green-btn:hover {
  background-color: #45a049;
}
</style>
<template>
  <div class="dropdown">
    <button
        type="button"
        class="btn green-btn dropdown-toggle"
        @click="toggleDropdown"
    >
      Vali matkavarustus
    </button>
    <div
        v-if="store.checklistItems.length > 0"
        :class="{'show': showChecklistDropdown}"
        class="dropdown-menu"
    >
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
import { ref, onMounted } from "vue";
import { useHikeStore } from "@/store/hikeStore";

export default {
  setup() {
    const store = useHikeStore();
    const showChecklistDropdown = ref(false);

    // Fetch checklist on component mount
    onMounted(async () => {
      try {
        await store.fetchChecklist();
        console.log('Checklist items:', store.checklistItems);
      } catch (error) {
        console.error('Failed to fetch checklist:', error);
      }
    });

    // Toggle the dropdown visibility
    const toggleDropdown = () => {
      showChecklistDropdown.value = !showChecklistDropdown.value;
      console.log('Dropdown toggled, now:', showChecklistDropdown.value);
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
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%; /* Position right below the button */
  left: 50%; /* Move to the horizontal center of the button */
  transform: translateX(-50%); /* Shift back by half its own width */
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  min-width: 200px; /* Optional: ensure a minimum width */
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000; /* Ensure it appears above other content */
}

.dropdown-menu.show {
  display: block;
}

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
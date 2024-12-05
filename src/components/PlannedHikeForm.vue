<template>
  <div>
    <h3>Planeeri uus matk</h3>
<!--
    <form @submit.prevent="addHike" class="planned-form">
-->
      <div class="form-group mb-2">
        <label for="trailDropdown">Matkaraja valik:</label>
        <select
            id="trailDropdown"
            class="form-control"
            v-model="this.$props.selectedTrail"
            @change="updateSelectedTrail"
        >
          <option disabled value="">Vali matkarada</option>
          <option v-for="trail in hikingTrails" :key="trail.id" :value="trail">
            {{ trail.name }}
          </option>
        </select>
      </div>
      <input
          type="text"
          v-model="this.$props.newHike.trailName"
          placeholder="Matkarada"
          class="form-control"
          readonly
      />
      <input
          type="text"
          v-model="this.$props.newHike.meetupPoint"
          placeholder="Kohtumispaik"
          class="form-control"
          required
      />
      <input type="date" v-model="this.$props.newHike.startDate" class="form-control" required />

      <PlannedChecklist
          :showChecklistDropdown="showChecklistDropdown"
          :items="checklistItems"
          v-model="selectedChecklistItems"
          @toggleDropdown = "toggleDropdown"
      />

      <button type="submit" class="btn green-btn mt-3">Lisa matk</button>
  </div>
</template>

<script>
import PlannedChecklist from "@/components/PlannedChecklist.vue";

export default{
  components: {PlannedChecklist},
  props: [
    'newHike' , 'hikingTrails', 'selectedTrail'],

  showHikeTable: false,
  data() {
    return {
      api: "http://localhost:8089/api/matk",
      showHikeTable: false,
      showChecklistDropdown: false, // Dropdowni nähtavuse haldamiseks
      checklistItems: [],
      selectedChecklistItems: [], // Valitud checklisti üksused
    };
  },
  methods:{
    updateSelectedTrail(){
      this.$emit('updateSelectedTrail', this.$props.newHike)
    },
    toggleDropdown() {
      this.showChecklistDropdown = !this.showChecklistDropdown;
    },
  }
}
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

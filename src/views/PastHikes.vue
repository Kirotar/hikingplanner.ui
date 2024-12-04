<template>
  <div>
    <h1>Tehtud matkad</h1>

    <!-- Dropdown to select trail -->
    <Dropdown
        :hikingTrails="hikingTrails"
        :dropdownVisible="dropdownVisible"
        @toggle-dropdown="toggleDropdown"
        @select-trail="selectTrail"
    />
    <br>

    <!-- Add Hike form -->
    <HikeForm :newHike="newHike" @add-hike="addHike" />

    <!-- Button to fetch hikes -->
    <button @click="fetchMyHike">Tehtud matkad</button>

    <!-- Display list of hikes -->
    <HikeList :hikes="hikes" />
  </div>
</template>

<script>
import axios from "axios";
import HikeForm from "@/components/HikeForm.vue";
import HikeList from "@/components/HikeList.vue";
import Dropdown from "@/components/DropdownMenu.vue";

export default {
  components: {
    HikeForm,
    HikeList,
    Dropdown
  },
  data() {
    return {
      api: "http://localhost:8089/api/matk",
      hikingTrails: [],
      hikes: [],
      dropdownVisible: false,  // Controls dropdown visibility
      newHike: {
        template: { id: null, name: "" }, // This will hold the HikeTemplate id, mapped by `template_id`
        notes: "",            // Notes for the hike
        startDate: "yyyy-MM-dd", // Example: "2024-12-05"
        endDate: "yyyy-MM-dd",   // Example: "2024-12-07"
        duration: "HH:mm",            // Leave empty, or calculate it later
        meetupPoint: "",         // Add the meetup point
        isCompleted: false       // Default value for completion status
      }
    };
  },
  methods: {
    //Gets all the pre-inserted trails
    fetchTrails() {
      axios.get(`${this.api}/get-trails`)
          .then(res => {
            this.hikingTrails = res.data;
          })
          .catch(error => {
            console.error("Error fetching trails:", error);
          });
    },
    //Selects one of the pre-inserted trails
    selectTrail(trail) {
      console.log(trail)
      this.newHike.template = { id: trail.id }; // `trail.id` is the `template_id` corresponding to `HikeTemplate
      this.newHike.trailName = trail.name; // stores the name for UI display, but it's not needed in the backend
      this.dropdownVisible = false; // Close the dropdown after selection
      console.log(this.newHike.trailName)
    },
    //Toggles dropdown visibility
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    //Gets all user inserted hikes
    fetchMyHike() {
      axios.get(`${this.api}/get-hikes`)
          .then(res => {
            this.hikes = res.data;
          })
          .catch(error => {
            console.error("Error fetching hikes:", error);
          });
    },
    addHike(newHike) {
      axios.post(`${this.api}/plan-hike`, newHike)
          .then (()=> {
            this.resetForm();
          })
          .catch(error => {
            console.error("Error adding hike:", error);
          });
    },
    resetForm() {
      this.newHike = {
        template: { id: null, name: "" },
        notes: "",
        duration: "",
        startDate: "",
        endDate: "",
        isCompleted: false
      };
    }
  },
  mounted() {
    this.fetchTrails();
  }
};

</script>

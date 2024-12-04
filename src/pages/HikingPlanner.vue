<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Minu matk</h1>
    <h3>Tehtud matkad</h3>
    <h3>Matkarajad</h3>
    <h3>Lemmikud</h3>
    <h3>Planeeritud matkad</h3>
    <h3>Minu saavutused & eesmärgid </h3>
  </div>


  <div>
    <h3>Matkarajad</h3>
    <!-- Siia kaart ja selle peale nupud, mis igaüks avaks väikse popout aknana ühe tabelis oleva matkaraja-->
  </div>
<br>
<br>
<br>
  <div>
  <h1>Tehtud matkad</h1>
  <!--Dropdown menüü -> Kasutaja saab lisada ise kõik andmed. Kalender? Koht kus kuvab iga tehtud matka ja saab klikkida,
   et rohkem näha. Seal saavutused. Mingi viis, kuidas kontrollib, et kas Planned Hikes on Completed ja siis kuvaks siin.-->

   <!-- Dropdown for selecting a trail -->
      <div class="dropdown">
        <button class="dropbtn" @click="toggleDropdown">Vali matkarada</button>
        <div class="dropdown-content" v-if="dropdownVisible">
          <a
              v-for="trail in hikingTrails"
              :key="trail.id"
              @click="selectTrail(trail)"
          >
            {{ trail.name }}
          </a>
        </div>
      </div>
    <br>
    <!-- Add Hike form -->
    <div class="container mt-4 rounded-5 custom-bg">
      <br>
      <div class="row g-3">
        <form @submit.prevent="addHike" class="row mb-3">
          <!-- Selected Trail Details -->
          <input v-model="newHike.trailName" placeholder="Matkarada" class="form-control col" required readonly/>
          <!-- Other form fields -->
          <input v-model="newHike.notes" placeholder="Märkmed" class="form-control col" />
          <input v-model="newHike.duration" type="time" class="form-control col" />
          <input
              type="date"
              v-model="newHike.startDate"
              class="form-control col"
              required
          />
          <input
              type="date"
              v-model="newHike.endDate"
              class="form-control col"
              required
          />
          <button class="btn btn-primary col btn-lg">Lisa matk</button>
        </form>
      </div>
<br>
<br>
<br>
      <div>
        <!-- Button to fetch past hikes -->
        <button @click="fetchMyHike">Tehtud matkad</button>

        <!-- Loop through the hikes to display each one with its own button -->
        <div v-for="hike in hikes" :key="hike.id" class="hike-info">
          <button @click="toggleDetails(hike.id)">
            {{ hike.template.name }} - {{ hike.startDate }}
          </button>

          <!-- Conditional rendering for hike details -->
          <div v-if="isDetailsVisible(hike.id)">
            <p><strong>Trail Name:</strong> {{ hike.template.name }}</p>
            <p><strong>Start Date:</strong> {{ hike.startDate }}</p>
            <p><strong>End Date:</strong> {{ hike.endDate }}</p>
            <p><strong>Duration:</strong> {{ hike.duration }}</p>
            <p><strong>Notes:</strong> {{ hike.notes }}</p>
            <p><strong>Meetup Point:</strong> {{ hike.meetupPoint }}</p>
          </div>
          <hr> <!-- Separator for readability -->
        </div>
      </div>

    </div>

    </div>
  </template>

  <script>
    import axios from "axios";

    export default {
      data() {
        return {
          api: "http://localhost:8089/api/matk",
          hikingTrails: [],
          hikes: [],
          dropdownVisible: false, // Controls dropdown visibility
          visibleHikeId: null, // Initialize to null to start with no visible hike
          newHike: {
            template: {id: null, name: "" },    // This will hold the HikeTemplate id, mapped by `template_id`
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
          console.log("Fetching trails...");
          axios
              .get(`${this.api}/get-trails`)
              .then((res) => {
                console.log("Fetched trails:", res.data);
                this.hikingTrails = res.data;
              })
              .catch((error) => {
                console.error("Error fetching trails:", error);
              });
        },
        //Selects one of the pre-inserted trails
        selectTrail(trail)  {
          this.newHike.template = {
            id: trail.id // Assuming `trail.id` is the `template_id` corresponding to `HikeTemplate`
          };
          this.newHike.trailName = trail.name; // You can still store the name for UI display, but it's not needed in the backend
          this.dropdownVisible = false; // Close the dropdown after selection
        },
        //Toggles dropdown visibility
        toggleDropdown() {
          this.dropdownVisible = !this.dropdownVisible; // Toggle visibility
        },
        //Gets all user inserted hikes
        fetchMyHike() {
          axios
              .get(`${this.api}/get-hikes`)
              .then((res) => {
                this.hikes = res.data;
              })
              .catch((error) => {
                console.error("Error fetching trails:", error);
              });
        },
        // Toggle visibility of details for a specific hike
        toggleDetails(hikeId) {
          if (this.visibleHikeId === hikeId) {
            this.visibleHikeId = null; // Hide details if the same button is clicked again
          } else {
            this.visibleHikeId = hikeId; // Show details for the selected hike
          }
        },

        // Check if the details of a hike should be visible
        isDetailsVisible(hikeId) {
          return this.visibleHikeId === hikeId;
        },
        resetForm() {
          this.newHike = {
            template: {id: null, name: ""},
            notes: "",
            duration: "",
            startDate: "",
            endDate: "",
            isCompleted: false,
          };
        },
        addHike() {
          axios.post(`${this.api}/plan-hike`, this.newHike).then((res) => {
            console.log("Hike added:", res.data);
            this.resetForm();
          })
              .catch((error) => {
                console.error("Error adding hike:", error.response ? error.response.data : error.message);
          });
        },
      },
      mounted() {
        this.fetchTrails();
      },
    };
  </script>

  <style scoped>

    .dropdown-content a {
      padding: 8px 16px;
      display: block;
      color: black;
      text-decoration: none;
       /* Defines the appearance of the <a> element inside .dropdown-content element
    Adds space, makes it larger. 8 vertical padding, 16 horizontal padding.
    Makes each link appear on a new line in the dropdown, without it, might not stretch across the dropdown width
    Removes underline*/
    }

  </style>


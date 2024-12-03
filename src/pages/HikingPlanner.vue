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
          <input v-model="newHike.name" placeholder="Matkarada" class="form-control col" required readonly/>
          <!-- Other form fields -->
          <input v-model="newHike.notes" placeholder="Märkmed" class="form-control col" required/>
          <input v-model="newHike.duration" placeholder="Matka kestvus" class="form-control col" required/>
          <input v-model="newHike.startDate" placeholder="Matka alguskuupäev" class="form-control col" required/>
          <input v-model="newHike.endDate" placeholder="Matka lõpukuupäev" class="form-control col" required/>
          <button class="btn btn-primary col btn-lg">Lisa matk</button>
        </form>
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
          newHike: {
            template: {id: null},    // This will hold the HikeTemplate id, mapped by `template_id`
            notes: "",            // Notes for the hike
            startDate: "yyyy-MM-dd", // Example: "2024-12-05"
            endDate: "yyyy-MM-dd",   // Example: "2024-12-07"
            duration: "",            // Leave empty, or calculate it later
            meetupPoint: "",         // Add the meetup point
            isCompleted: false       // Default value for completion status
          }
        };
      },
      methods: {
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
        selectTrail(trail)  {
          this.newHike.template = {
            id: trail.id // Assuming `trail.id` is the `template_id` corresponding to `HikeTemplate`
          };
          this.newHike.trailName = trail.name; // You can still store the name for UI display, but it's not needed in the backend
          this.dropdownVisible = false; // Close the dropdown after selection
        },
        toggleDropdown() {
          this.dropdownVisible = !this.dropdownVisible; // Toggle visibility
        },
        fetchMyHike() {
          console.log("Fetching trails...");
          axios
              .get(`${this.api}/get-hikes`)
              .then((res) => {
                this.hikes = res.data;
              })
              .catch((error) => {
                console.error("Error fetching trails:", error);
              });
        },
        resetForm() {
          this.newHike = {
            template: "",
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


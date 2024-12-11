<template>
  <!-- Toggle Achievements Table -->
  <div id= "app" class="mt-4">
    <button @click="toggleAchievementsTable" class="btn green-btn">
      {{ showAchievementsTable ? "Peida Saavutused" : "Vaata enda saavutusi" }}
    </button>
    <div v-if="showAchievementsTable" class="mt-3">
      <h2>Saavutuste Tabel</h2>
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Matkarada</th>
          <th>Matka Tüübid</th>
          <th>Maamärgid</th>
          <th>Loomad</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="achievement in achievements" :key="achievement.id">
          <td>{{ achievement.hikeName || '' }}</td>
          <td>{{ achievement.hikeTypeNames.join(", ") || '' }}</td>
          <td>{{ achievement.landmarkNames.join(", ") || '' }}</td>
          <td>{{ achievement.animalNames.join(", ") || '' }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div id="app" class="form-container mt-4">
    <h3>Lisa uus saavutus</h3>
    <form @submit.prevent="addAchievement">
      <!-- Hiking Trail Dropdown -->
      <div id="app" class="form-group mb-2">
        <label for="trailDropdown">Vali Matkarada:</label>
        <select id="trailDropdown" class="form-control" v-model="newAchievement.hikeId">
          <option disabled value="">Vali matkarada</option>
          <option v-for="trail in trails" :key="trail.id" :value="trail.id">
            {{ trail.name }}
          </option>
        </select>
      </div>

      <!-- Hike Type Dropdown with Checkbox -->
      <div id="app" class="form-group mb-2">
        <button type="button" class="btn green-btn" @click="toggleDropdown('hikeType')">
          Vali Matka Tüüp
        </button>
        <div v-if="dropdowns.hikeType" class="dropdown-checkbox">
          <div v-for="hikeType in hikeTypes" :key="hikeType.id">
            <input type="checkbox" :value="hikeType.id" v-model="newAchievement.typeOfHikeIds" />
            <span>{{ hikeType.typeOfHikeName }}</span>
          </div>
        </div>
      </div>

      <!-- Landmark Dropdown with Checkbox -->
      <div id="app" class="form-group mb-2">
        <button type="button" class="btn green-btn" @click="toggleDropdown('landmark')">
          Vali Maamärk
        </button>
        <div v-if="dropdowns.landmark" class="dropdown-checkbox">
          <div v-for="landmark in landmarks" :key="landmark.id">
            <input type="checkbox" :value="landmark.id" v-model="newAchievement.landmarkIds" />
            <span>{{ landmark.landmarkName }}</span>
          </div>
        </div>
      </div>

      <!-- Animal Dropdown with Checkbox -->
      <div id="app" class="form-group mb-2">
        <button type="button" class="btn green-btn" @click="toggleDropdown('animal')">
          Vali Loom
        </button>
        <div v-if="dropdowns.animal" class="dropdown-checkbox">
          <div v-for="animal in animals" :key="animal.id">
            <input type="checkbox" :value="animal.id" v-model="newAchievement.animalIds" />
            <span>{{ animal.animalName }}</span>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div id="app">
        <button type="submit" class="btn green-btn mt-3">Salvesta Saavutus</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useHikeStore } from "@/store/hikeStore";

export default {
  data() {
    return {
      apiBase: "http://localhost:8089/api/achievements",
      hikeTypes: [],
      landmarks: [],
      animals: [],
      achievements: [],
      showAchievementsTable: false, // Kontrollib tabeli nähtavust
      dropdowns: {
        hikeType: false,
        landmark: false,
        animal: false,
      },
      newAchievement: {
        hikeId: "",
        typeOfHikeIds: [],
        landmarkIds: [],
        animalIds: [],
      },
    };
  },
  computed: {
    trails() {
      const store = useHikeStore();
      return store.getHikingTrails;
    },
  },
  methods: {
    toggleDropdown(type) {
      this.dropdowns[type] = !this.dropdowns[type];
    },
    toggleAchievementsTable() {
      this.showAchievementsTable = !this.showAchievementsTable;
      if (this.showAchievementsTable) {
        this.fetchAchievements(); // Laadi saavutused, kui tabel kuvatakse
      }
    },
    fetchHikeTypes() {
      axios
          .get(`${this.apiBase}/get-all-hike-types`)
          .then((res) => {
            this.hikeTypes = res.data;
          })
          .catch((err) => {
            console.error("Viga matkatüüpide laadimisel:", err);
          });
    },
    fetchLandmarks() {
      axios
          .get(`${this.apiBase}/get-all-landmarks`)
          .then((res) => {
            this.landmarks = res.data;
          })
          .catch((err) => {
            console.error("Viga maamärkide laadimisel:", err);
          });
    },
    fetchAnimals() {
      axios
          .get(`${this.apiBase}/get-all-animals`)
          .then((res) => {
            this.animals = res.data;
          })
          .catch((err) => {
            console.error("Viga loomade laadimisel:", err);
          });
    },
    fetchAchievements() {
      axios
          .get(`${this.apiBase}/get-all-user-achievements`)
          .then((res) => {
            this.achievements = res.data.map((achievement) => ({
              ...achievement,
              hikeTypeNames: achievement.hikeTypeNames || [],
              landmarkNames: achievement.landmarkNames || [],
              animalNames: achievement.animalNames || [],
            }));
          })
          .catch((err) => {
            console.error("Viga saavutuste laadimisel:", err);
          });
    },
    addAchievement() {
      if (!this.newAchievement.hikeId) {
        alert("Vali matkarada!");
        return;
      }

      axios
          .post(`${this.apiBase}/save-achievement`, this.newAchievement)
          .then(() => {
            alert("Saavutus edukalt lisatud!");
            this.resetForm();
            if (this.showAchievementsTable) {
              this.fetchAchievements(); // Värskenda tabelit, kui see on avatud
            }
          })
          .catch((err) => {
            console.error("Viga saavutuse salvestamisel:", err);
            alert("Viga saavutuse salvestamisel. Proovi uuesti.");
          });
    },
    resetForm() {
      this.newAchievement = {
        hikeId: "",
        typeOfHikeIds: [],
        landmarkIds: [],
        animalIds: [],
      };
    },
  },
  mounted() {
    this.fetchHikeTypes();
    this.fetchLandmarks();
    this.fetchAnimals();
  },
};
</script>

<style>
/* Vormide stiilid */
.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-control {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

/* et nupukesed oleksid ühe suurused*/
button {
  display: inline-block;
  text-align: center;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 200px;
  min-height: 50px;
  box-sizing: border-box;
}

.green-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.green-btn:hover {
  background-color: #45a049;
  color: white;
}

.mt-3 {
  margin-top: 1rem;
}

/* Tabeli stiilid */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 1rem;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.table th,
.table td {
  padding: 10px 15px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.table td {
  background-color: #f9f9f9;
}

.table tbody tr:nth-child(even) td {
  background-color: #f2f2f2;
}

.table tbody tr:hover td {
  background-color: #e9ffe9;
}

.achievements-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: left; }

  /* Dropdown styles */
  .dropdown-checkbox {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-top: 5px;
    max-height: 200px;
    overflow-y: auto;
  }

  .dropdown-checkbox div {
    margin-bottom: 5px;
}
</style>

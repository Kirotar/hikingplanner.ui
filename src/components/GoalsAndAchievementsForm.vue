<template>
  <div class="achievements-container">
    <div class="mt-4">
      <button @click="toggleAchievementsTable" class="btn green-btn mb-2">
        Näita Saavutusi
      </button>
      <br>
      <br>
      <h1>Lisa uus saavutus</h1>
      <div v-if="showAchievementsTable">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Matkarada</th>
            <th>Matka Tüübid</th>
            <th>Maamärgid</th>
            <th>Loomad</th>
            <!--            <th>Tegevused</th>-->
          </tr>
          </thead>
          <tbody>
          <tr v-for="achievement in achievements" :key="achievement.id">
            <td>{{ achievement.hikeName || '' }}</td>
            <td>{{ achievement.hikeTypeNames.join(", ") || '' }}</td>
            <td>{{ achievement.landmarkNames.join(", ") || '' }}</td>
            <td>{{ achievement.animalNames.join(", ") || '' }}</td>
            <td>{{achievement.activityNames.join("," || '')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add New Achievement -->
    <div class="mt-4">
      <form @submit.prevent="addAchievement">
        <!-- Hiking Trail Dropdown -->
        <div class="form-group mb-2">
          <label for="trailDropdown">Vali Matkarada:</label>
          <select id="trailDropdown" class="form-control" v-model="newAchievement.hikeId">
            <option disabled value="">Vali matkarada</option>
            <option v-for="trail in trails" :key="trail.id" :value="trail.id">
              {{ trail.name }}
            </option>
          </select>
        </div>

        <!-- Hike Type Dropdown with Checkbox -->
        <div class="form-group mb-2">
          <button type="button" class="btn green-btn" @click="toggleDropdown('hikeType')">
            Vali Matka Tüüp
          </button>
          <div v-if="dropdowns.hikeType" class="dropdown-checkbox">
            <div v-for="hikeType in hikeTypes" :key="hikeType.id">
              <input
                  type="checkbox"
                  :value="hikeType.id"
                  v-model="newAchievement.typeOfHikeIds"
              />
              <span>{{ hikeType.typeOfHikeName }}</span>
            </div>
          </div>
        </div>

        <!-- Landmark Dropdown with Checkbox -->
        <div class="form-group mb-2">
          <button type="button" class="btn green-btn" @click="toggleDropdown('landmark')">
            Vali Maamärk
          </button>
          <div v-if="dropdowns.landmark" class="dropdown-checkbox">
            <div v-for="landmark in landmarks" :key="landmark.id">
              <input
                  type="checkbox"
                  :value="landmark.id"
                  v-model="newAchievement.landmarkIds"
              />
              <span>{{ landmark.landmarkName }}</span>
            </div>
          </div>
        </div>

        <!-- Animal Dropdown with Checkbox -->
        <div class="form-group mb-2">
          <button type="button" class="btn green-btn" @click="toggleDropdown('animal')">
            Vali Loom
          </button>
          <div v-if="dropdowns.animal" class="dropdown-checkbox">
            <div v-for="animal in animals" :key="animal.id">
              <input
                  type="checkbox"
                  :value="animal.id"
                  v-model="newAchievement.animalIds"
              />
              <span>{{ animal.animalName }}</span>
            </div>
          </div>
        </div>

        <!--        &lt;!&ndash; Activity Dropdown &ndash;&gt;-->
        <!--        <div class="form-group mb-2">-->
        <!--          <label for="activityDropdown">Vali tegevus:</label>-->
        <!--          <select id="activityDropdown" class="form-control" v-model="newAchievement.activitiesId">-->
        <!--            <option disabled value="">Vali tegevus</option>-->
        <!--            <option v-for="activity in activities" :key="activity.id" :value="activity.id">-->
        <!--              {{ activity.activityName }}-->
        <!--            </option>-->
        <!--          </select>-->
        <!--        </div>-->

        <!-- Submit Button -->
        <button type="submit" class="btn green-btn mt-3">Salvesta Saavutus</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      apiBase: "http://localhost:8089/api/achievements",
      api: "http://localhost:8089/api/matk",
      achievements: [],
      animals: [],
      hikeTypes: [],
      landmarks: [],
      trails: [],
      activities: [],
      dropdowns: {
        hikeType: false,
        landmark: false,
        animal: false,
        activities: false,
      },
      showAchievementsTable: false,
      newAchievement: {
        hikeId: "",
        typeOfHikeIds: [],
        landmarkIds: [],
        animalIds: [],
        activities: [],
      },
    };
  },
  methods: {
    toggleDropdown(type) {
      this.dropdowns[type] = !this.dropdowns[type];
    },
    toggleAchievementsTable() {
      this.showAchievementsTable = !this.showAchievementsTable;
      if (this.showAchievementsTable) {
        this.fetchAchievements();
      }
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
              // activityNames: achievement.activityNames || [],
            }));
          })
          .catch((err) => {
            console.error("Viga saavutuste laadimisel:", err);
            alert("Viga saavutuste laadimisel. Proovi hiljem uuesti.");
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
            alert("Viga loomade laadimisel.");
          });
    },
    fetchHikeTypes() {
      axios
          .get(`${this.apiBase}/get-all-hike-types`)
          .then((res) => {
            this.hikeTypes = res.data;
          })
          .catch((err) => {
            console.error("Viga matkatüüpide laadimisel:", err);
            alert("Viga matkatüüpide laadimisel.");
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
            alert("Viga maamärkide laadimisel.");
          });
    },
    fetchTrails() {
      axios
          .get(`${this.api}/get-trails`)
          .then((res) => {
            this.trails = res.data;
          })
          .catch((err) => {
            console.error("Viga matkaradade laadimisel:", err);
            alert("Viga matkaradade laadimisel.");
          });
    },
    // fetchActivities() {
    //   axios
    //       .get(`${this.apiBase}/get-all-activities`)
    //       .then((res) => {
    //         this.activities = res.data;
    //       })
    //       .catch((err) => {
    //         console.error("Viga tegevuste laadimisel:", err);
    //         alert("Viga tegevuste laadimisel.");
    //       });
    // },
    addAchievement() {
      if (!this.newAchievement.hikeId) {
        alert("Väli peab olema täidetud!");
        return;
      }

      const { hikeId, typeOfHikeIds, landmarkIds, animalIds } = this.newAchievement;

      axios
          .post(`${this.apiBase}/save-achievement`, {
            hikeId,
            typeOfHikeIds,
            landmarkIds,
            animalIds,
          })
          .then(() => {
            alert("Saavutus edukalt lisatud!");
            this.resetAchievementForm();
            this.fetchAchievements();
          })
          .catch((err) => {
            console.error(
                "Viga saavutuse salvestamisel:",
                err.response?.data || err.message
            );
            alert(
                `Viga saavutuse salvestamisel: ${
                    err.response?.data?.message || "Tundmatu serveri viga."
                }`
            );
          });
    },
    resetAchievementForm() {
      this.newAchievement = {
        hikeId: "",
        typeOfHikeIds: [],
        landmarkIds: [],
        animalIds: [],
      };
    },
  },
  mounted() {
    this.fetchAnimals();
    this.fetchHikeTypes();
    this.fetchLandmarks();
    this.fetchTrails();
  },
};
</script>

<style>
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

/* Üldised stiilid */
.achievements-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 0 0 20px; /* et kogu achievementi container oleks vasakul */
  font-family: Arial, sans-serif;
  text-align: left; /* Ensure everything is left-aligned */
}

body .achievements-container h1 { /* lisada body, et ei tekiks stiilide konflikti */
  font-size: 2rem;
  color: #ffffff;
  text-align: left;
  margin-bottom: 20px;
}

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

button {
  cursor: pointer;
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

/* Nupud ja tabelid */
button {
  display: inline-block;
  margin-top: 1rem;
}

.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Responsiivsus */
@media (max-width: 768px) {
  .form-control {
    width: 100%;
  }

  .table th,
  .table td {
    font-size: 0.9rem;
    padding: 8px 10px;
  }

  button {
    width: 100%;
    margin-top: 10px;
  }
}

</style>
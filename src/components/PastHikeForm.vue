<template>
  <div class="container mt-4 rounded-5 custom-bg">
    <form @submit.prevent="store.addHike" class="mb-3">
      <div class="form-group mb-3">
        <input
            v-model="store.newHike.trailName"
            placeholder="Matkarada"
            class="form-control"
            required
            readonly
        />
      </div>
      <div class="form-group mb-3">
        <input
            v-model="store.newHike.notes"
            placeholder="Märkmed"
            class="form-control"
        />
      </div>
      <div class="form-group mb-3">
        <input
            v-model="store.newHike.duration"
            type="time"
            class="form-control"
        />
      </div>
      <div class="form-group mb-3">
        <input
            type="date"
            v-model="store.newHike.startDate"
            class="form-control"
            required
        />
      </div>
      <div class="form-group mb-3">
        <input
            type="date"
            v-model="store.newHike.endDate"
            class="form-control"
            required
        />
      </div>

      <div id="App" class="form-container mt-4">
        <h3>Lisa uus saavutus ja loom/lind, keda matkal nägid</h3>
        <form @submit.prevent="handleSubmit">
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
          <!-- Achievements Icon -->
          <div class="icon-container">
            <i class="fa fa-map-marker-alt icon" @click="toggleDropdown('achievement')"></i>
            <span>Saavutus</span>
            <div v-if="dropdowns.achievement" class="dropdown-checkbox">
              <div v-for="achievement in achievements" :key="achievement.id" class="checkbox-item">
                <input
                    type="checkbox"
                    :value="achievement.id"
                    v-model="newAchievement.achievementsIds"
                />
                <span>{{ achievement.achievementName }}</span>
              </div>
            </div>
          </div>

          <!-- Animal Icon -->
          <div class="icon-container">
            <i class="fa fa-paw icon" @click="toggleDropdown('animal')"></i>
            <span>Loomad</span>
            <div v-if="dropdowns.animal" class="dropdown-checkbox">
              <div v-for="animal in animals" :key="animal.id" class="checkbox-item">
                <input
                    type="checkbox"
                    :value="animal.id"
                    v-model="newAchievement.animalType"
                />
                <span>{{ animal.animalName }}</span>
              </div>
            </div>
          </div>

          <!-- Birds Icon -->
          <div class="icon-container">
            <i class="fa fa-feather-alt icon" @click="toggleDropdown('bird')"></i>
            <span>Linnud</span>
            <div v-if="dropdowns.bird" class="dropdown-checkbox">
              <div v-for="bird in birds" :key="bird.id" class="checkbox-item">
                <input
                    type="checkbox"
                    :value="bird.id"
                    v-model="newAchievement.birdType"
                />
                <span>{{ bird.animalName }}</span>
              </div>
            </div>
          </div>
          <div id="app">
            <button type="submit" class="btn green-btn mt-3">
              <i class="fa fa-save"></i> Salvesta
            </button>
          </div>
        </form>>
      </div>
      <div>
        <button class="btn btn-success btn-lg">Lisa matk</button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import {useHikeStore} from "@/store/hikeStore";

export default {
  setup() {
    const store = useHikeStore();
    return {store,};
  },
  data() {
    return {
      api: "http://localhost:8089/api/matk",
      animals: [],
      birds: [],
      achievements: [],
      dropdowns: {
        achievement: false,
        animal: false,
        bird: false,
      },
      newAchievement: {
        hikeId: "",
        achievementsIds: [],
        animalType: [],
        birdType: [],
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
    fetchAnimalsAndBirds() {
      axios
          .get(`${this.api}/get-all-animals`)
          .then((res) => {
            this.animals = res.data.filter((item) => item.category === "animal");
            this.birds = res.data.filter((item) => item.category === "bird");
          })
          .catch((err) => {
            console.error("Viga loomade ja lindude laadimisel:", err);
          });
    },
    fetchAchievements() {
      axios
          .get(`${this.api}/get-all-achievements`)
          .then((res) => {
            console.log("Laetud saavutused:", res.data); // Kontrolli siit
            this.achievements = res.data;
          })
          .catch((err) => {
            console.error("Viga saavutuste laadimisel:", err);
          });
    },

    handleSubmit() {
      if (!this.newAchievement.hikeId) {
        alert("Palun vali matkarada.");
        return;
      }

      // Salvesta saavutused
      if (this.newAchievement.achievementsIds.length > 0) {
        this.saveAchievements(this.newAchievement.hikeId, this.newAchievement.achievementsIds);
      }

      // Salvesta loodusvaatlused
      if (this.newAchievement.animalType.length > 0 || this.newAchievement.birdType.length > 0) {
        this.saveWildlifeSightings(this.newAchievement.animalType, this.newAchievement.birdType);
      }


      // Vorm lähtestatakse
      this.resetForm();
    },

    saveAchievements(hikeId, selectedAchievementIds) {
      axios
          .post(`${this.api}/${hikeId}/save-achievement`, selectedAchievementIds)
          .then((response) => {
            console.log("Successfully saved achievements:", response.data);
            alert("Achievements saved successfully!");
          })
          .catch((error) => {
            console.error("Error saving achievements:", error);
            alert("Failed to save achievements.");
          });
    },

    saveWildlifeSightings(hikeId,) {
      axios
          .post(`${this.api}/${hikeId}/save-wildlife-sightings`, null, {
            params: {
              animalType: [],
              birdType: [],
            },
          })
          .then((response) => {
            console.log("Successfully saved wildlife sightings:", response.data);
            alert("Wildlife sightings saved successfully!");
          })
          .catch((error) => {
            console.error("Error saving wildlife sightings:", error);
            alert("Failed to save wildlife sightings.");
          });
    },

    resetForm() {
      this.newAchievement = {
        hikeId: "",
        achievementsIds: [],
        animalIds: [],
      };
    },
  },
  mounted() {
    this.fetchAnimalsAndBirds();
    this.fetchAchievements();
  },


};</script>

<style>
/* Üldine vormi konteiner */
.form-container {
  max-width: 700px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Icon container */
.icon-dropdowns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.icon-container span {
  margin-top: 5px;
  font-size: 1rem;
  color: #333;
}

.icon {
  font-size: 40px;
  color: #4caf50;
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon:hover {
  color: #45a049;
  transform: scale(1.1);
}


.dropdown-checkbox {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 60px; /* Position the dropdown below the icon */
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-item input {
  margin-right: 10px;
}

.checkbox-item span {
  font-size: 0.9rem;
}

/* Submit Button */
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.green-btn {
  background-color: #4caf50;
  color: white;
}

.green-btn:hover {
  background-color: #45a049;
}

</style>
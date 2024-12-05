<template>
  <div class="planned-container">
    <h1>Planeeritud matkad</h1>

    <!-- Minu planeeritud matkad -->
    <div class="mt-4">
      <button @click="toggleHikeTable" class="btn green-btn mb-2">
        Minu planeeritud matkad
      </button>

      <div v-if="showHikeTable">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>Matkarada</th>
            <th>Alguskuupäev</th>
            <th>Kohtumispaik</th>
            <th>CheckList</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="hike in hikes" :key="hike.id">
            <td>{{ hike.template.name }}</td>
            <td>{{ hike.startDate }}</td>
            <td>{{ hike.meetupPoint }}</td>
            <td>
              <ul>
                <li v-for="item in hike.checklist" :key="item.id">
                  {{ item.checklistItem.name }}
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Planeeri uus matk -->
    <div class="mt-4">
      <h3>Planeeri uus matk</h3>
      <div class="form-group mb-2">
        <label for="trailDropdown">Matkaraja valik:</label>
        <select
            id="trailDropdown"
            class="form-control"
            v-model="selectedTrail"
            @change="updateSelectedTrail"
        >
          <option disabled value="">Vali matkarada</option>
          <option v-for="trail in hikingTrails" :key="trail.id" :value="trail">
            {{ trail.name }} ({{ trail.location }})
          </option>
        </select>
      </div>

      <div v-if="selectedTrail" class="mt-4">
        <form @submit.prevent="addHike" class="planned-form">
          <input
              type="text"
              v-model="newHike.trailName"
              placeholder="Matkarada"
              class="form-control"
              readonly
          />
          <input
              type="text"
              v-model="newHike.meetupPoint"
              placeholder="Kohtumispaik"
              class="form-control"
              required
          />
          <input type="date" v-model="newHike.startDate" class="form-control" required />

          <!-- Checklist Dropdown -->
          <div class="dropdown">
            <button
                type="button"
                class="btn green-btn dropdown-toggle"
                @click="toggleDropdown"
            >
              Vali Checklist
            </button>
            <div v-show="showChecklistDropdown" class="dropdown-menu">
              <div v-for="item in checklistItems" :key="item.id" class="form-check">
                <input
                    type="checkbox"
                    :id="`checklist-item-${item.id}`"
                    :value="item.id"
                    v-model="selectedChecklistItems"
                    class="form-check-input"
                />
                <label :for="`checklist-item-${item.id}`" class="form-check-label">
                  {{ item.name }}
                </label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn green-btn mt-3">Lisa matk</button>
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
      checklistItems: [],
      selectedChecklistItems: [], // Valitud checklisti üksused
      showHikeTable: false,
      selectedTrail: null,
      showChecklistDropdown: false, // Dropdowni nähtavuse haldamiseks
      newHike: {
        trailName: "",
        meetupPoint: "",
        startDate: "",
        template: { id: null },
      },
    };
  },
  methods: {
    fetchTrails() {
      axios
          .get(`${this.api}/get-trails`)
          .then((res) => {
            this.hikingTrails = res.data;
          })
          .catch((err) => {
            console.error("Viga matkaradade laadimisel:", err);
          });
    },
    fetchChecklistItems() {
      axios
          .get(`${this.api}/checklist`)
          .then((res) => {
            this.checklistItems = res.data;
          })
          .catch((err) => {
            console.error("Viga checklisti üksuste laadimisel:", err);
          });
    },
    fetchMyHike() {
      axios
          .get(`${this.api}/get-hikes`)
          .then((res) => {
            this.hikes = res.data.map((hike) => ({
              ...hike,
              checklist: [],
            }));
            this.hikes.forEach((hike) => {
              this.fetchChecklistForHike(hike.id);
            });
          })
          .catch((err) => {
            console.error("Viga planeeritud matkade laadimisel:", err);
          });
    },
    fetchChecklistForHike(hikeId) {
      axios
          .get(`${this.api}/hike/${hikeId}/checklist`)
          .then((res) => {
            const hike = this.hikes.find((h) => h.id === hikeId);
            if (hike) {
              hike.checklist = res.data;
            }
          })
          .catch((err) => {
            console.error("Viga checklisti laadimisel:", err);
          });
    },
    toggleHikeTable() {
      this.showHikeTable = !this.showHikeTable;
      if (this.showHikeTable) {
        this.fetchMyHike();
      }
    },
    updateSelectedTrail() {
      if (this.selectedTrail) {
        this.newHike.trailName = this.selectedTrail.name;
        this.newHike.template.id = this.selectedTrail.id;
      }
    },
    toggleDropdown() {
      this.showChecklistDropdown = !this.showChecklistDropdown;
    },
    addHike() {
      if (!this.newHike.meetupPoint || !this.newHike.startDate) {
        alert("Kõik väljad tuleb täita!");
        return;
      }

      const hikeData = {
        ...this.newHike,
        checklistItems: this.selectedChecklistItems, // Lisame checklisti valikud
      };

      axios
          .post(`${this.api}/plan-hike`, hikeData)
          .then((res) => {
            const hikeId = res.data.id;
            this.saveChecklist(hikeId);
            alert("Matk lisatud!");
            this.resetForm();
            this.fetchMyHike();
          })
          .catch((err) => {
            console.error("Viga matka lisamisel:", err);
          });
    },
    saveChecklist(hikeId) {
      axios
          .post(`${this.api}/hike/${hikeId}/add-checklist`, this.selectedChecklistItems)
          .then(() => {
            alert("Checklist salvestatud!");
          })
          .catch((err) => {
            console.error("Viga checklisti salvestamisel:", err);
          });
    },
    resetForm() {
      this.newHike = {
        trailName: "",
        meetupPoint: "",
        startDate: "",
        template: { id: null },
      };
      this.selectedTrail = null;
      this.selectedChecklistItems = [];
    },
  },
  mounted() {
    this.fetchTrails();
    this.fetchChecklistItems();
  },
};
</script>

<style>
.planned-container {
  padding: 20px;
  text-align: left;
}

.planned-container h1 {
  font-family: "Lora", serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #faebd7;
  margin-bottom: 20px;
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

.form-control {
  width: 80%;
  max-width: 500px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  max-width: 500px;
}

.dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 10px;
}

.dropdown-menu .form-check {
  margin-bottom: 10px;
}

.dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>

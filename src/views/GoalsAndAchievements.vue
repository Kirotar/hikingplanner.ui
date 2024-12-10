<template>
  <div id="app" class="achievements-container">
    <div class="header">
      <h1>Minu saavutused matkal</h1>
    </div>

    <!-- Button to toggle achievements table -->
    <div class="mt-4">
      <button @click="toggleAchievementsTable" class="btn green-btn mb-2">
        Näita Saavutusi
      </button>
      <br><br>

      <!-- Achievements Table -->
      <div v-if="showAchievementsTable">
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
            <td>{{ Array.isArray(achievement.hikeTypeNames) ? achievement.hikeTypeNames.join(", ") : '' }}</td>
            <td>{{ Array.isArray(achievement.landmarkNames) ? achievement.landmarkNames.join(", ") : '' }}</td>
            <td>{{ Array.isArray(achievement.animalNames) ? achievement.animalNames.join(", ") : '' }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Achievement Form -->
    <div class="mt-4">
      <goals-and-achievements-form @form-submit="handleFormSubmit" />
    </div>
  </div>
</template>

<script>
import GoalsAndAchievementsForm from "@/components/GoalsAndAchievementsForm.vue";
import { useHikeStore } from "@/stores/hikeStore";

export default {
  components: { GoalsAndAchievementsForm },
  data() {
    return {
      showAchievementsTable: false,
    };
  },
  computed: {
    achievements() {
      return useHikeStore().achievements;
    },
  },
  methods: {
    toggleAchievementsTable() {
      this.showAchievementsTable = !this.showAchievementsTable;
      if (this.showAchievementsTable) {
        useHikeStore().fetchAchievements();
      }
    },
    handleFormSubmit(newAchievement) {
      useHikeStore().addAchievement(newAchievement);
    },
  },
};
</script>

<style>
.achievements-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.header h1 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 1rem;
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

.table tbody tr:nth-child(even) td {
  background-color: #f2f2f2;
}

.table tbody tr:hover td {
  background-color: #e9ffe9;
}

.green-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.green-btn:hover {
  background-color: #45a049;
}

.mt-4 {
  margin-top: 20px;
}
</style>

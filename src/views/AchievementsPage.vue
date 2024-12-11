<template>
<div>
  <div>
    <img
        id="hike-ten"
        src="../assets/hike.png"
        height="294"
        width="189"
        :style="{ opacity: distanceAchieved > 10 ? 1 : 0.5 }"
    />
    <label for="hike-ten">10 kilomeetrit läbitud!</label>

    <img
        id="hike-hundred"
        src="../assets/hike.png"
        height="294"
        width="189"
        :style="{ opacity: distanceAchieved > 100 ? 1 : 0.5 }"
    />
    <label for="hike-hundred">100 kilomeetrit läbitud!</label>

    <img
        id="hike-fivehundered"
        src="../assets/hike.png"
        height="294"
        width="189"
        :style="{ opacity: distanceAchieved > 500 ? 1 : 0.5 }"
    />
    <label for="hike-fivehundered">500 kilomeetrit läbitud!</label>

    <img
        id="hike-thousand"
        src="../assets/hike.png"
        height="294"
        width="189"
        :style="{ opacity: distanceAchieved > 1000 ? 1 : 0.5 }"
    />
    <label for="hike-thousand">1000 kilomeetrit läbitud!</label>

    <img
        id="hike-tenthousand"
        src="../assets/hike.png"
        height="294"
        width="189"
        :style="{ opacity: distanceAchieved > 10000 ? 1 : 0.5 }"
    />
    <label for="hike-tenthousand">10 000 kilomeetrit läbitud!</label>
  </div>
</div>
  <div>
    <h2>Distance Achieved: {{ distanceAchieved }} km</h2>
    <button @click="fetchDistanceAchieved">Get Distance Achieved</button>

    <h2>Achievement Unlocked:
      <span v-if="achievementUnlocked === 'hundred'">🚶‍♂️ Walked 100 km!</span>
      <span v-else-if="achievementUnlocked === 'thousand'">🏃‍♀️ Walked 1000 km!</span>
      <span v-else-if="achievementUnlocked === 'tenthousand'">🚵 Walked 10,000 km!</span>
      <span v-else>{{ achievementUnlocked }}</span>
    </h2>
    <button @click="fetchAchievementUnlocked">Check Achievement Unlocked</button>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
  setup() {
    // Reactive variables to store results
    const distanceAchieved = ref(0.0); // Initialize with a default value
    const achievementUnlocked = ref(""); // Initialize with a default string
    const api = "http://localhost:8091/api/matk"; // Replace with your actual API base URL

    // Fetch distance completed
    const fetchDistanceAchieved = async () => {
      try {
        const response = await axios.get(`${api}/distance-completed`);
        distanceAchieved.value = response.data; // Update reactive variable
      } catch (error) {
        console.error("Error fetching distance achieved:", error);
      }
    };

    // Fetch achievement unlocked
    const fetchAchievementUnlocked = async () => {
      try {
        const response = await axios.get(`${api}/distance-unlocked`);
        achievementUnlocked.value = response.data; // Update reactive variable
      } catch (error) {
        console.error("Error fetching achievement unlocked:", error);
      }
    };
    onMounted(() => {
      fetchAchievementUnlocked(); // Call the function when the component is mounted
      fetchDistanceAchieved()
    });

    // Return variables and methods for template usage
    return {
      distanceAchieved,
      achievementUnlocked,
      fetchDistanceAchieved,
      fetchAchievementUnlocked,
    };
  },
};
</script>


<style scoped>

</style>
<template>
  <div class="achievement-container">
    <h2 style="color: black">Mitu matka oled teinud: {{ nrOfHikesAchieved }}</h2>
    <div class="achievement-images">
      <div class="achievement-item">
        <img
            id="one-hike"
            src="../assets/rada.png"
            :style="{ opacity: nrOfHikesAchieved > 1 ? 1 : 0.5 }"
            alt="Raja ikoon"
        />
        <label for="one-hike">Esimene matk tehtud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="five-hikes"
            src="../assets/rada.png"
            :style="{ opacity: nrOfHikesAchieved > 5 ? 1 : 0.5 }"
            alt="Raja ikoon"

        />
        <label for="five-hikes">Viis matka tehtud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="ten-hikes"
            src="../assets/rada.png"
            :style="{ opacity: nrOfHikesAchieved > 10 ? 1 : 0.5 }"
            alt="Raja ikoon"

        />
        <label for="hike-fivehundered">Kümme matka tehtud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="hike-thousand"
            src="../assets/rada.png"
            :style="{ opacity: nrOfHikesAchieved > 15 ? 1 : 0.5 }"
            alt="Raja ikoon"

        />
        <label for="hike-thousand">15 matka tehtud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="hike-tenthousand"
            src="../assets/rada.png"
            :style="{ opacity: nrOfHikesAchieved > 20 ? 1 : 0.5 }"
            alt="Raja ikoon"

        />
        <label for="hike-tenthousand">20 matka tehtud!</label>
      </div>
    </div>


    <h2 style="color: black">Mitu kilomeetrit oled matkanud: {{ distanceAchieved }} km</h2>

    <div class="achievement-images">
      <div class="achievement-item">
        <img
            id="hike-ten"
            src="../assets/hike.png"
            :style="{ opacity: distanceAchieved > 10 ? 1 : 0.5 }"
            alt="Matkaja ikoon"

        />
        <label for="hike-ten">10 kilomeetrit läbitud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="hike-hundred"
            src="../assets/hike.png"
            :style="{ opacity: distanceAchieved > 100 ? 1 : 0.5 }"
            alt="Matkaja ikoon"

        />
        <label for="hike-hundred">100 kilomeetrit läbitud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="hike-fivehundered"
            src="../assets/hike.png"
            :style="{ opacity: distanceAchieved > 500 ? 1 : 0.5 }"
            alt="Matkaja ikoon"

        />
        <label for="hike-fivehundered">500 kilomeetrit läbitud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="hike-thousand"
            src="../assets/hike.png"
            :style="{ opacity: distanceAchieved > 1000 ? 1 : 0.5 }"
            alt="Matkaja ikoon"

        />
        <label for="hike-thousand">1000 kilomeetrit läbitud!</label>
      </div>
      <div class="achievement-item">
        <img
            id="hike-tenthousand"
            src="../assets/hike.png"
            :style="{ opacity: distanceAchieved > 10000 ? 1 : 0.5 }"
            alt="Matkaja ikoon"

        />
        <label for="hike-tenthousand">10 000 kilomeetrit läbitud!</label>
      </div>
    </div>

  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
  setup() {
    // Reactive variables to store results
    const distanceAchieved = ref(0.0); // Initialize with a default value
    const nrOfHikesAchieved = ref(0.0);
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

    // Fetch nr of hikes completed
    const fetchNrOfHikesAchieved = async () => {
      try {
        const response = await axios.get(`${api}/nr-hikes-completed`);
        nrOfHikesAchieved.value = response.data; // Update reactive variable
      } catch (error) {
        console.error("Error fetching number of hikes:", error);
      }
    };

    onMounted(() => {
      fetchDistanceAchieved()
      fetchNrOfHikesAchieved()
    });

    // Return variables and methods for template usage
    return {
      distanceAchieved,
      fetchDistanceAchieved,
      nrOfHikesAchieved,
    };
  },
};
</script>

<style scoped>
.achievement-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.achievement-images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  width: 100%;
}

.achievement-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 0 1 calc(20% - 15px);
  max-width: 200px;
  margin-bottom: 15px;
}

.achievement-item img {
  max-width: 100%;
  height: 200px;  /* Fixed height to maintain consistent sizing */
  width: 100%;
  object-fit: contain;
  margin-bottom: 10px;
}

.achievement-item label {
  font-size: 0.9rem;
  color: black;
}

@media (max-width: 1200px) {
  .achievement-item {
    flex: 0 1 calc(33.33% - 15px);
  }
}

@media (max-width: 768px) {
  .achievement-item {
    flex: 0 1 calc(50% - 15px);
    max-width: 250px;
  }

  .achievement-item img {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .achievement-container {
    padding: 10px;
  }

  .achievement-images {
    gap: 10px;
  }

  .achievement-item {
    flex: 0 1 calc(50% - 10px);
    max-width: 100%;
  }

  .achievement-item img {
    height: 200px;
  }

  .achievement-item label {
    font-size: 0.8rem;
  }
}

@media (max-width: 350px) {
  .achievement-item {
    flex: 0 1 100%;
  }

  .achievement-item img {
    height: 150px;
  }
}
</style>
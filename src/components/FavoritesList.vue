<template>
  <div class="trail-list">
    <div
        v-for="trail in store.hikingTrails"
        :key="trail.id"
        :data-id="trail.id"
        class="trail-card"
    >

      <div class="table-row">
        <div class="table-cell label">Matkarada</div>
        <div class="table-cell value">{{ trail.name }}</div>
      </div>
      <div class="table-row">
        <div class="table-cell label">Maakond</div>
        <div class="table-cell value">{{ trail.location }}</div>
      </div>
      <div class="table-row">
        <div class="table-cell label">Matkaraja pikkus</div>
        <div class="table-cell value">{{ trail.distanceKm }} km</div>
      </div>
      <div class="table-row">
        <div class="table-cell label">Rohkem infot</div>
        <div class="table-cell value">
          <a :href="trail.detailsUrl" target="_blank">loodusegakoos.ee</a></div>
      </div>
      <div class="table-row">
        <div class="table-cell label">
          <i
              class="fa fa-heart"
              :class="{ red: trail.is_favorite }"
              @click="toggleFavorite(trail)"
          ></i>
        </div>
        <div class="table-cell value">
          <button type="button" class="btn btn-success" @click="$router.push('/planned')">Planeeri
            matk
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useHikeStore} from "@/store/hikeStore";

export default {
  setup() {
    const store = useHikeStore();
    store.fetchTrails().then(() => {
      store.hikingTrails.forEach((trail) => {
        const savedFavorite = localStorage.getItem(`hikingtrail${trail.id}_favorite`);
        trail.is_favorite = savedFavorite === "true"; // laeb favorite'itud
      });
      sortTrails();
    });
    // Toggle favorite status
    const toggleFavorite = (trail) => {
      trail.is_favorite = !trail.is_favorite; // Update the favorite status
      localStorage.setItem(`hikingtrail${trail.id}_favorite`, trail.is_favorite.toString()); // Salvestab localStorage'isse
      animateTrailMove(trail); //Sorteeri rajad ümber
    };

    /* Visuaalse animatsiooni rakendamine */
    const animateTrailMove = (trail) => {
      const trailElement = document.querySelector(`.trail-card[data-id="${trail.id}"]`); // document.querySelector: Otsib DOM-ist matkaraja kaarti (trail-card), mille data-id vastab trail.id-le.
      if (trailElement) {
        trailElement.classList.add("moving"); // Lisa animatsiooni klass

        // Ajastab animatsiooni
        setTimeout(() => {
          sortTrails();
          setTimeout(() => {
            trailElement.classList.remove("moving"); // Eemalda "moving" klass
            trailElement.classList.add("normal"); // Taastab algse suuruse
          }, 300); //  0,3s
        }, 300); // 0,3s
      }
    };
    const sortTrails = () => {
      // Sorteerime olemasoleva arrayd
      const sortedTrails = [...store.hikingTrails].sort((a, b) => {
        if (a.is_favorite === b.is_favorite) {
          return 0;
        }
        return b.is_favorite - a.is_favorite; // punase südamega rajad ette poole
      });
      // Anname uue järjestatud massiivi loendile
      store.hikingTrails = sortedTrails;
    };
    return {store, toggleFavorite, sortTrails};
  },
};
</script>

<style scoped>
.trail-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  gap: 15px;
}

.trail-card {
  background-color: #f9f9f9;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.table-row {
  display: flex;
  margin-bottom: 5px;
  align-items: center;

}

.table-cell {
  padding: 2px 5px;
}

.table-cell.label {
  flex: 0 0 25%;
  font-weight: bold;
  color: #333;
  margin-right: 10px;

}

.table-cell.value {
  flex: 1;
  color: #666;
}


.table-cell.value a {
  color: #0066cc;
  text-decoration: none;
}

.table-cell.value a:hover {
  text-decoration: underline;
}

/* Heart Icon Styles */
.fa-heart {
  color: grey;
  font-size: 30px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.fa-heart.red {
  color: red;
}

.trail-card {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.trail-card.moving {
  transform: scale(1.20); /* Veidi suuremaks */
  opacity: 0.8; /* Veidi läbipaistvamaks */
}
.trail-card.normal {
  transform: scale(1); /* Tavaline suurus */
  opacity: 1; /* Tavaline läbipaistvus */
}
</style>
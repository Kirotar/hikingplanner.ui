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
      <div>
        <button class="btn btn-success btn-lg">Lisa matk</button>
      </div>
    </form>
  </div>
</template>


<script>
import {useHikeStore} from "@/store/hikeStore";

export default {
  setup() {
    const store = useHikeStore();
    return { store,};
  },
};</script>

<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.container {
  text-align: left; /* Kõik elemendid joondatud vasakule */
  max-width: 600px; /* Kitsenda konteineri laiust */
  margin-left: 0; /* Nihuta vasakule */
  margin-right: auto; /* Kui vaja, eemalda tsentreerimine */
  padding: 20px; /* Lisa veidi polsterdust */
}

form {
  text-align: left; /* Joonda vorm vasakule */
  width: 100%; /* Veendu, et vorm võtab konteineri laiuse */
}

.form-group {
  width: 100%; /* Veendu, et iga sisend on täislaiuses */
  margin-bottom: 1rem; /* Lisa vahed vormigruppide vahele */
}

input,
textarea {
  width: 100%; /* Sisendite täielik laius */
  max-width: 500px; /* Kitsenda sisendeid vastavalt vajadusele */
  text-align: left; /* Sisendiväärtused vasakule */
}

button {
  width: auto; /* Nuppude automaatne suurus */
  display: inline-block; /* Hoia normaalne suurus */
  margin-left: 0; /* Nihuta vasakule */
  font-size: 1rem;
  padding: 10px 20px; /* Kohanda suurust */
}

</style>
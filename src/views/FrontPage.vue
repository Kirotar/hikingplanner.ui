<template>
  <div class="kaart-container" @click="getCoordinates">
    <!-- PNG kaart -->
    <img src="@/assets/eesti-kaart-roheline.png" alt="Eesti kaart" class="kaart" />
<!--    <p v-if="coordinates">X: {{ coordinates.x }}, Y: {{ coordinates.y }}</p>-->
    <!-- Maakonna pinid ja nimed -->
    <div
        v-for="(maakond, index) in maakonnad"
        :key="index"
    >
      <!-- Maakonna pin -->
      <div
          :style="{
          top: maakond.position.y + 'px',
          left: maakond.position.x + 'px',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
        }"
          class="maakond-pin"
          @click.stop="goToUrl(maakond.url)"
      >
        <img src="@/assets/red-pin.png" alt="Pin" />
      </div>
      <!-- Maakonna nimi -->
      <div
          :style="{
          top: maakond.position.y + 10 + 'px', /* Nihutab nime pisut allapoole pini */
          left: maakond.position.x + 'px',
          position: 'absolute',
          transform: 'translate(-50%, 0)',
        }"
          class="maakond-nimi"
      >
        {{ maakond.name }}
      </div>
    </div>
  </div>

</template>


<script>
export default {
  data() {
    return {
      coordinates: null,
      maakonnad: [
        {
          name: "Viru raba",
          position: { x: 668, y: 196 },
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/lahemaa-rahvuspark/1717",
        },
        {
          name: "Kamari-Kärevere veemarsruut",
          position: { x: 780, y: 441 },
          url: "https://loodusegakoos.ee/kuhuminna/kaitsealad/alam-pedja-looduskaitseala/5195",
        },
        {
          name: "Elva jõe ürgoru matkarada",
          position: { x: 804, y: 548 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/tartu-jogeva-puhkeala/elva-joe-urgoru-matkarada-15-km",
        },
        {
          name: "Mukri loodusrada",
          position: { x: 541, y: 388 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/sakala-puhkeala/mukri-raba-loodusrada",
        },
        {
          name: "Meenikunno matkarada",
          position: { x: 992, y: 607 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/rapina-varska-puhkeala/1379",
        },
        {
          name: "Kakerdaja loodusrada",
          position: { x: 676, y: 403 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/aegviidu-korvemaa-puhkeala/1225",
        },
        {
          name: "Marimetsa matkarada",
          position: { x: 437, y: 308 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/nova-puhkeala/1770",
        },
        {
          name: "Tuhu matkarada",
          position: { x: 552, y: 553 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/parnumaa-puhkeala/tuhu-matkarada",
        },
        {
          name: "Karula pikk jalgsimatkarada",
          position: { x: 940, y: 718 },
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/karula-rahvuspark/1311",
        },
        {
          name: "Pühajärve matkarada",
          position: { x: 787, y: 680 },
          url: "https://loodusegakoos.ee/kuhuminna/kaitsealad/otepaa-looduspark/1254",
        },
        {
          name: "Kärdla matkarada",
          position: { x: 225, y: 393 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/hiiumaa-puhkeala/1594",
        },
        {
          name: "Kurtna matkarada",
          position: { x: 954, y: 289 },
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/alutaguse-rahvuspark/1420",
        },
        {
          name: "Ingatsi õpperada",
          position: { x: 676, y: 564 },
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/soomaa-rahvuspark/1272",
        },
        {
          name: "Oandu loodusmetsarada",
          position: { x: 806, y: 295 },
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/lahemaa-rahvuspark/1715",
        },
        {
          name: "Abula-Kalsma õpperada",
          position: { x: 279, y: 462 },
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/saaremaa-puhkeala/1681",
        },
      ],
    };
  },

  methods: {
    goToUrl(url)
    {
      window.open(url, "_blank");
    }
  },
};
</script>

<style>
.kaart-container {
  position: relative;
  width: 1200px; /* Fikseeritud laius */
  height: 848.4px; /* Fikseeritud kõrgus */
  margin: 0 auto; /* Keskendamiseks */
  aspect-ratio: 1200/848.4;
}

.kaart {
  width: 100%;
  height: auto;
  display: block;
  z-index: 1;
}

.maakond-pin {
  cursor: pointer;
  z-index: 2;
}

.maakond-pin img {
  width: 5%; /* Pins will scale relative to the map */
  max-width: 30px; /* Prevent pins from becoming too large */
  min-width: 30px; /* Prevent pins from becoming too small */
}
@media (max-width: 768px) {
  .maakond-pin img {
    width: 6%; /* Slightly larger pins for smaller screens */
  }
}
.maakond-nimi {
  font-size: 14px;
  font-weight: bold;
  color: #073703;
  text-align: center;
  white-space: nowrap;
  z-index: 2;
}
</style>
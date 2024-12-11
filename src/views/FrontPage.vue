<template>
  <div class="kaart-container" @click="getCoordinates">
    <!-- PNG kaart -->
    <img src="@/assets/eesti-kaart-roheline.png" alt="Eesti kaart" class="kaart" />

    <!-- Koordinaadid pinnide sättimiseks-->
    <p v-if="coordinates">X: {{ coordinates.x }}, Y: {{ coordinates.y }}</p>
    <!-- Maakonna pinid -->
    <div
        v-for="(maakond, index) in maakonnad"
        :key="index"
        :style="getPinStyle(maakond.position)"
        class="maakond-pin"
        @click.stop="goToUrl(maakond.url)"
    >

      <p v-if="kaartMootmed">Kaardi algne suurus: {{ kaartMootmed.width }} x {{ kaartMootmed.height }}</p>
    <!--PNG pin-->
      <img src="@/assets/red-pin.png" alt="Pin" />
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
          name: "Harjumaa",
          position: {x: 649, y: 213},
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/lahemaa-rahvuspark/1717",
        },
        {
          name: "Jõgevamaa",
          position: {x: 748, y: 429},
          url: "https://loodusegakoos.ee/kuhuminna/kaitsealad/alam-pedja-looduskaitseala/5195",
        },
        {
          name: "Tartumaa",
          position: {x: 908, y: 488},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/tartu-jogeva-puhkeala/elva-joe-urgoru-matkarada-15-km",
        },
        {
          name: "Raplamaa",
          position: {x: 541, y: 388},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/sakala-puhkeala/mukri-raba-loodusrada",
        },
        {
          name: "Põlvamaa",
          position: {x: 982, y: 632},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/rapina-varska-puhkeala/1379",
        },
        {
          name: "Järvamaa",
          position: {x: 676, y: 403},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/aegviidu-korvemaa-puhkeala/1225",
        },
        {
          name: "Läänemaa",
          position: {x: 404, y: 423},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/nova-puhkeala/1770",
        },
        {
          name: "Pärnumaa",
          position: {x: 552, y: 553},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/parnumaa-puhkeala/tuhu-matkarada",
        },
        {
          name: "Võrumaa",
          position: {x: 940, y: 718},
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/karula-rahvuspark/1311",
        },
        {
          name: "Valgamaa",
          position: {x: 787, y: 680},
          url: "https://loodusegakoos.ee/kuhuminna/kaitsealad/otepaa-looduspark/1254",
        },
        {
          name: "Hiiumaa",
          position: {x: 225, y: 393},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/hiiumaa-puhkeala/1594",
        },
        {
          name: "Ida-Virumaa",
          position: {x: 996, y: 217},
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/alutaguse-rahvuspark/1420",
        },
        {
          name: "Viljandimaa",
          position: {x: 676, y: 564},
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/soomaa-rahvuspark/1272",
        },
        {
          name: "Lääne-Virumaa",
          position: {x: 806, y: 295},
          url: "https://loodusegakoos.ee/kuhuminna/rahvuspargid/lahemaa-rahvuspark/1715",
        },
        {
          name: "Saaremaa",
          position: {x: 152, y: 544},
          url: "https://loodusegakoos.ee/kuhuminna/puhkealad/saaremaa-puhkeala/1681",
        },
      ],
    };
  },

  methods: {
    getCoordinates(event) {
      // Leiab koordinaadid klikitud kohas
      const rect = event.target.getBoundingClientRect();
      this.coordinates = {
        x: Math.round(event.clientX - rect.left),
        y: Math.round(event.clientY - rect.top),
      };
    },
      goToUrl(url)
      {
        window.open(url, "_blank");
      },

    getPinStyle(position) {
      const kaart = this.$refs.kaart; // Kaardi DOM-element
      if (!kaart) {
        return {
          top: "0px",
          left: "0px",
        };
      }

      // Kaardi praegused mõõtmed
      const kaartLaius = kaart.clientWidth;
      const kaartKorgus = kaart.clientHeight;

      // Algse kaardi mõõtmed (1200x848.4)
      const originalWidth = 1200;
      const originalHeight = 848.4;

      // Skaala arvutamine
      const scaleX = kaartLaius / originalWidth;
      const scaleY = kaartKorgus / originalHeight;

      // Arvutatud proportsionaalsed positsioonid
      return {
        top: position.y * scaleY + "px",
        left: position.x * scaleX + "px",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      };
    }


  },
};
</script>

<style>
.kaart-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.kaart {
  width: 100%;
  display: block;
  z-index: 1;
}

.maakond-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
}

.maakond-pin img {
  width: 30px;
  height: 30px;
}
</style>
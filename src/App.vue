<template>
  <div class="background-image"></div>
  <div id="app">
    <header>
      <h1>Minu matk</h1>
      <nav>
        <ul>
          <li><router-link to="/planned">PLANEERITUD MATKAD</router-link></li>
          <li><router-link to="/finished">TEHTUD MATKAD</router-link></li>
          <li><router-link to="/favorites">LEMMIKUD</router-link></li>
          <li><router-link to="/goals">SAAVUTUSED & EESMÄRGID</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Router View - this will display the appropriate page based on the route -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
/* Globaalstiilid */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
  font-family: "Playfair Display", sans-serif;
  font-optical-sizing: auto;
  display: flex;
  justify-content: center;
  align-items: start;
}

/* Taustapilt */
.background-image {
  position: fixed; /* Püsib alati paigal */
  top: 0;
  left: 0;
  width: 100vw; /* Katab akna laiuse */
  height: 100vh; /* Katab akna kõrguse */
  background-image: url('@/assets/path-1356948_1280.jpg'); /* Õige failitee */
  background-size: cover; /* Katab kogu ala proportsionaalselt */
  background-position: center; /* Keskendab tausta */
  background-attachment: fixed; /* Taust jääb paigale */
  opacity: 0.7; /* Läbipaistvus */
  z-index: -1; /* Tagab, et see jääb sisu taha */
}

/* Rakenduse peasisu */
#app {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  text-align: center; /* Joondab teksti keskele */
  align-items: center; /* Joondab kõik elemendid keskele */
  padding: 20px;
}

/* Päise stiilid */
header {
  width: 100%;
  padding: 15px 20px;
  background: linear-gradient(
      90deg,
      rgba(77, 133, 129, 1) 0%,
      rgba(6, 76, 19, 1) 19%,
      rgba(74, 158, 27, 1) 42%,
      rgba(0, 212, 255, 0) 93%
  );
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column; /* Asetab pealkirja ja menüü üksteise alla */
  align-items: center; /* Joondab keskele */
  gap: 10px; /* Vahe pealkirja ja menüü vahel */
}

/* Pealkiri */
header h1 {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  color: #faebd7;
  margin: 0;
  padding: 0;
  text-align: center; /* Joondab pealkirja keskele */
  font-size: 2.5rem; /* Suurem font suurus */
  font-weight: 700; /* Lisatud paksus, et rõhutada */
}

/* Navigatsioon */
nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center; /* Menüü joondus keskele */
  gap: 15px; /* Vahe elementide vahel */
}

nav li {
  margin: 0;
}

nav a {
  text-decoration: none;
  color: #faebd7;
  font-size: 1rem; /* Natuke suurem font suurus */
  font-weight: 500; /* Veidi paksem, et muuta nähtavamaks */
  padding: 5px 10px;
}

nav a:hover {
  text-decoration: underline;
}

/* Tekstistiilid */
h1, h2, h3, h4, h5 {
  font-family: "Lora", serif;
  font-optical-sizing: auto;
  color: #372003;
}

</style>

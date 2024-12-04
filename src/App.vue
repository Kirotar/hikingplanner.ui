<template>
  <div id="app">
    <div class="background-image"></div>
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
  name: "App",
};
</script>

<style>
/* Global styles */
#app {
  position: relative;  /* To stack content over the background */
  z-index: 1;
  margin: 0;
  text-align: left;
  padding: 20px;

}
h1,h2,h3, h4, h5{
  font-family: "Lora", serif;
  font-optical-sizing: auto;
  color: #FAEBD7;
  margin-left:20px;
}

body {
  font-family: "Playfair Display", sans-serif;
  font-optical-sizing: auto;
  margin: 0; /* Remove default margin */
  height: 100vh;  /* Ensure full screen height */
  display: flex;
  flex-direction: column;
}

/* Background image div */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/path-1356948_1280.jpg'); /* Correct path */
  background-size: cover;
  background-position: center;
  opacity: 0.7;  /* Apply opacity here */
  z-index: -1;  /* Ensure it's behind the content */
}
header {
  background: rgb(77,133,129);
  background: linear-gradient(90deg, rgba(77,133,129,1) 0%, rgba(6,76,19,1) 19%, rgba(74,158,27,1) 42%, rgba(0,212,255,0) 93%);
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
  margin-left:11px;

}

nav li {
  display: inline;
  margin: 10px;
}

nav a {
  text-decoration: none;
  color: #FAEBD7;
}

nav a:hover {
  text-decoration: underline;
}


</style>

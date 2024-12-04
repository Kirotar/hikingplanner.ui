<template>
  <div id="app">
    <header>
      <h1>Minu matk</h1>
      <nav>
        <ul>
          <li><router-link to="/completed">Completed Hikes</router-link></li>
          <li><router-link to="/">Planned Hikes</router-link></li>
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

<style scoped>
/* Global styles */
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin: 0;
}

header {
  background-color: #f5f5f5;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: inline;
  margin: 10px;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a:hover {
  text-decoration: underline;
}

</style>

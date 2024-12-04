<template>
  <div class="dropdown">
    <button class="dropbtn" @click="toggleDropdown">Vali matkarada</button>
    <div class="dropdown-content" v-if="dropdownVisible">
      <a v-for="trail in hikingTrails" :key="trail.id" @click="selectTrail(trail)">
        {{ trail.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hikingTrails', 'dropdownVisible'],
  methods: {
    toggleDropdown() {
      this.$emit('toggle-dropdown');
    },
    selectTrail(trail) {
      this.$emit('select-trail', trail);
    }
  }
};
</script>

<style scoped>


.dropdown-content a {
  padding: 8px 16px;
  display: block;
  color: black;
  text-decoration: none;
  /* Defines the appearance of the <a> element inside .dropdown-content element
Adds space, makes it larger. 8 vertical padding, 16 horizontal padding.
Makes each link appear on a new line in the dropdown, without it, might not stretch across the dropdown width
Removes underline*/
}


</style>


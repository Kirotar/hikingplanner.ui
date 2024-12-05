<template>
  <div>
    <div v-for="hike in hikes" :key="hike.id" class="hike-info">
      <button @click="toggleDetails(hike.id)">
        {{ hike.template.name }} - {{ hike.startDate }}
      </button>
      <div v-if="isDetailsVisible(hike.id)">
        <p><strong>Trail Name:</strong> {{ hike.template.name }}</p>
        <p><strong>Start Date:</strong> {{ hike.startDate }}</p>
        <p><strong>End Date:</strong> {{ hike.endDate }}</p>
        <p><strong>Duration:</strong> {{ hike.duration }}</p>
        <p><strong>Notes:</strong> {{ hike.notes }}</p>
        <p><strong>Meetup Point:</strong> {{ hike.meetupPoint }}</p>
      </div>
      <hr> <!-- Separator for readability -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['hikes'],
  data() {
    return {
      visibleHikeId: null  // Initialize to null to start with no visible hike
    };
  },
  methods: {
    // Toggle visibility of details for a specific hike
    toggleDetails(hikeId) {
      this.visibleHikeId = this.visibleHikeId === hikeId ? null : hikeId;
      //Need to not show "Meetup Point"
    },
    // Check if the details of a hike should be visible
    isDetailsVisible(hikeId) {
      return this.visibleHikeId === hikeId;
    }

  }
};

</script>

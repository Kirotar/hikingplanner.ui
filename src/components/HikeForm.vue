<template>
  <div class="container mt-4 rounded-5 custom-bg">
    <form @submit.prevent="addHike" class="row mb-3">
      <input v-model="this.$props.newHike.trailName" placeholder="Matkarada" class="form-control col" required readonly/>
      <input v-model="this.$props.newHike.notes" placeholder="Märkmed" class="form-control col" />
      <input v-model="this.$props.newHike.duration" type="time" class="form-control col" />
      <input type="date" v-model="this.$props.newHike.startDate" class="form-control col" required />
      <input type="date" v-model="this.$props.newHike.endDate" class="form-control col" required />
      <button class="btn btn-primary col btn-lg">Lisa matk</button>
    </form>
  </div>
</template>

<!--Do not change the props-->
<script>
export default {
  props: {
    newHike: Object
  },
  data(){
    return{
    }
  },
  methods: {
    addHike() {
      this.$emit('add-hike', this.$props.newHike);
    }
  }
};
</script>
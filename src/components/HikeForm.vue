<template>
  <div class="container mt-4 rounded-5 custom-bg">
    <form @submit.prevent="addHike" class="row mb-3">
      <div class="form-group mb-3">

        <input v-model="this.$props.newHike.trailName" placeholder="Matkarada" class="form-control col" required
               readonly/>
      </div>
      <div class="form-group mb-3">
        <input v-model="this.$props.newHike.notes" placeholder="Märkmed" class="form-control col"/>
      </div>
      <div class="form-group mb-3">
        <input v-model="this.$props.newHike.duration" type="time" class="form-control col"/>
      </div>
      <div class="form-group mb-3">
        <input type="date" v-model="this.$props.newHike.startDate" class="form-control col" required/>
      </div>
      <div class="form-group mb-3">
        <input type="date" v-model="this.$props.newHike.endDate" class="form-control col" required/>
      </div>
      <button class="btn btn-success w-100 col btn-lg">Lisa matk</button>
    </form>
  </div>
</template>

<!--Do not change the props-->
<script>
export default {
  props: {
    newHike: Object
  },
  data() {
    return {}
  },
  methods: {
    addHike() {
      this.$emit('add-hike', this.$props.newHike);
    }
  }
};

</script>
<style scoped>
input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

</style>
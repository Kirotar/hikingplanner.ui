<template>
  <div>
    <button @click="toggleHikeTable" class="btn green-btn mb-2">
      Minu planeeritud matkad
    </button>

    <div v-if="showHikeTable">
      <table class="table table-bordered">
        <thead>
        <tr>
          <th>Matkarada</th>
          <th>Alguskuupäev</th>
          <th>Kohtumispaik</th>
          <th>CheckList</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hike in hikes" :key="hike.id">
          <td>{{ hike.template.name }}</td>
          <td>{{ hike.startDate }}</td>
          <td>{{ hike.meetupPoint }}</td>
          <td>
            <ul>
              <li v-for="item in hike.checklist" :key="item.id">
                {{ item.checklistItem.name }}
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default{
  props: ['hikes', 'checklist', 'showHikeTable'],
  methods:{
    toggleHikeTable(){
      this.$emit('toggleHikeTable')
    }
  }
}
</script>

<style scoped>
.green-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.green-btn:hover {
  background-color: #45a049;
}
</style>

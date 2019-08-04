<template>
  <div class="container">
    <b-row>
      <b-col md="3">
        <h2>Dashboard</h2>
      </b-col>
      <b-col>League News </b-col>
    </b-row>
    <hr>
    <b-row>
      <!-- Get next game and any previous games that do not have a score -->
      <b-col md="6">Upcoming game</b-col>
      <!-- Show the last 5 games and their scores -->
      <b-col md="6">Recent Games</b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>

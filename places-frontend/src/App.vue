<template>
  <div class="container-fluid">
      <Places/>
  </div>
</template>

<script>
import Places from './components/Places.vue'

export default {
  name: 'App',
  components: {
    Places
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
    <v-parallax
    dark
    :src="require('@/assets/img/back.jpg')"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-3 font-weight-thin mb-3">The Event</h1>
      <h3 class="subheading text-xs-center">Мы отбираем только захватывающие мероприятия</h3>
    </v-layout>
  </v-parallax>
</template>

<script>
    export default {
        name: "Parallax"
    }
</script>

<style scoped>

</style>
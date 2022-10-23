<template>
  <div class="flex">
    <div  class=" flex w-full justify-around items-center" style="height: 64px; box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);" >
      <nuxt-link to="/" class="text-2xl font-semibold text-_primary">
        RED TETRIS
      </nuxt-link>
      <span v-if="player && player.username">
        <span class="text-_light">Connected as </span><span class="text-_primary">{{ player.username }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

const player: UserDTO = usePlayer()

</script>

<style scoped>

</style>
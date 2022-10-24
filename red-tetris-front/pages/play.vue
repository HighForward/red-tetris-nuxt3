<script setup lang="ts">
import PlayBoard from "~/components/PlayBoard.vue";

definePageMeta({
  middleware: ["web-socket"]
})


</script>

<template>
  <div>
    <PlayBoard />
  </div>
</template>


<style scoped>



</style>
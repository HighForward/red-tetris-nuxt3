<script setup lang="ts">

import { ref, onMounted, reactive } from '#imports'
// https://socket.io/docs/v4/client-options/#auth
// https://vuejs.org/guide/essentials/template-refs.html#accessing-the-refs
// https://v3.nuxtjs.org/guide/going-further/internals

</script>

<template>
  <div class="index">
    <SelectUsername />
  </div>
</template>


<style scoped>

.index {
 @apply bg-_dark flex justify-center mt-16;
}

</style>
<script setup lang="ts">

const props = defineProps(['board'])

function setColor(val: number) {
  if (val === 1)
    return 'bg-tetris-purple'
  if (val === 2)
    return 'bg-tetris-yellow'
  if (val === 3)
    return 'bg-tetris-green'
  if (val === 4)
    return 'bg-tetris-blue'
  if (val === 5)
    return 'bg-tetris-orange'
  if (val === 6)
    return 'bg-tetris-blue-sky'
  if (val === 7)
    return 'bg-tetris-red'
  if (val === 9)
    return 'bg-tetris-hard-gray'
}

</script>

<template>
      <div class="flex flex-col justify-center bg-gray rounded-sm" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">
        <div class="flex flex-row" v-for="(row, y) in props?.board?.board" :key="y">
          <div class="h-3 w-3" v-for="(item, x) in row" :key="x">
            <div class="w-full h-full" :class="setColor(item)" style="box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.5);"></div>
          </div>
        </div>
    </div>
</template>

<style scoped>

  .others_container {
    @apply flex;

  }

</style>
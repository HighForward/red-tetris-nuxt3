<script setup lang="ts">

import { useBoard } from "~/composables/board";

const board = useBoard()


</script>

<template>

  <div class="flex flex-col w-full p-4 justify-center items-center text-smallgray">
    <span>Partie de:<span class="text-red pl-2 font-bold">{{ " " + board?.player?.name }}</span></span>
    <span>Score:<span class="text-red pl-2 font-bold">{{ " " + board.score }}</span></span>
  </div>

  <div class="flex flex-col items-center h-full font-semibold">

    <div class="flex flex-col justify-center bg-gray rounded-sm" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">
      <div class="flex flex-row" v-for="(row, i) in board.board" :key="i">
        <div class="h-8 w-8" v-for="(item, x) in row" :key="x">
          <div class="w-full h-full" style="box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.5);"></div>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>


</style>
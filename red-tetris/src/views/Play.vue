<script setup lang="ts">

import { useBoard, useBoardListeners, setColor, useGameBoards } from "~/composables/board";
import { usePlayerStore } from "@/stores/players";
import { useGamesStore } from "@/stores/games";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoardsStore } from "@/stores/boards";
import { useKeyBoard } from "@/composables/keyboard";

const gamesStore = useGamesStore()
const { game } = storeToRefs(gamesStore)

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

const boardsStore = useBoardsStore()
const { boards } = storeToRefs(boardsStore)

const blockRef = ref(null)

const board_index = boards.value.findIndex(b => b.player.id === player.value.id)

const othersBoards = computed(() => {
    return boards.value.filter((board) => {
        return board.player.id !== player.value.id
    })
})
useKeyBoard()

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
    if (val === 10)
      return 'bg-tetris-shadow'
}

onMounted(() => {

})

</script>

<template>

    <div class="flex flex-col">
      <div class="flex justify-around px-8">

          <div v-if="othersBoards.length > 0" class="others__container">
              <div v-for="board in othersBoards" class="p-4">

                  <div class="flex flex-col w-full p-4 justify-center items-center">
                      <span>Partie de:<span class="test-content pl-2 font-bold">{{ " " + board?.player?.username }}</span></span>
                      <span>Score:<span class="test-content pl-2 font-bold">{{ " " + board?.score }}</span></span>
                  </div>
                  <div class="flex flex-row" v-for="(row, y) in board.board" :key="y">
                      <div class="h-4 w-4" v-for="(item, x) in row" :key="x">
                          <div class="w-full h-full" :class="setColor(item)" style="box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);" ref="blockRef"></div>
                      </div>
                  </div>

              </div>
          </div>

          <div v-if="boards[board_index]" class="flex flex-col items-center h-full font-semibold">
              <div class="flex flex-col w-full p-4 justify-center items-center">
                  <span>Partie de:<span class="text-red pl-2 font-bold">{{ " " + boards[board_index]?.player?.username }}</span></span>
                  <span>Score:<span class="text-red pl-2 font-bold">{{ " " + boards[board_index]?.score }}</span></span>
              </div>

              <div class="flex flex-col justify-center bg-gray rounded-sm" style="box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.35);">
                  <div class="flex flex-row" v-for="(row, y) in boards[board_index].board" :key="y">
                      <div class="h-8 w-8" v-for="(item, x) in row" :key="x">
                          <div class="w-full h-full" :class="setColor(item)" style="box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);" ref="blockRef"></div>
                      </div>
                  </div>
              </div>
          </div>

      </div>

    </div>

</template>

<style scoped>
.others__container {
    max-width: 750px;
    display: flex;
    flex-wrap: wrap;
}

</style>
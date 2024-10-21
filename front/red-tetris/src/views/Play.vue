<script setup lang="ts">

import { useBoard, useBoardListeners, setColor, useGameBoards } from "~/composables/board";
import { useKeyBoard } from "~/composables/keyboard";
import { usePlayerStore } from "@/stores/players";
import { useGamesStore } from "@/stores/games";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useBoardsStore } from "@/stores/boards";

const gamesStore = useGamesStore()
const { game } = storeToRefs(gamesStore)
// const game_boards = useGameBoards()
const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

const boardsStore = useBoardsStore()
const { board, boards } = storeToRefs(boardsStore)

const blockRef = ref(null)

const player_board = boards.value.find(b => b.player.id === player.value.id)

// useBoardListeners()
// useKeyBoard()

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

onMounted(() => {
    boardsStore.getBoard()
})

</script>

<template>

    <div class="flex flex-col w-full p-4 justify-center items-center text-smallgray">
        <span>Partie de:<span class="text-red pl-2 font-bold">{{ " " + board?.player?.username }}</span></span>
        <span>Score:<span class="text-red pl-2 font-bold">{{ " " + board?.score }}</span></span>
    </div>

    <div class="flex justify-around px-8">

<!--        <div v-if="game_boards.length > 1" class="flex flex-wrap justify-around p-4" style="min-width: 200px">-->
<!--            <div v-for="board in game_boards.filter(b => b.player.id !== player.id)" class="p-4">-->
<!--                <OthersBoards v-if="board?.player?.id !== player?.id" :board="board" />-->
<!--            </div>-->
<!--        </div>-->

        <div v-if="board" class="flex flex-col items-center h-full font-semibold">

            <div class="flex flex-col justify-center bg-gray rounded-sm" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">
                <div class="flex flex-row" v-for="(row, y) in board.board" :key="y">
                    <div class="h-8 w-8" v-for="(item, x) in row" :key="x">
                        <div class="w-full h-full" :class="setColor(item)" style="box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.5);" ref="blockRef">{{ item }}</div>
                    </div>
                </div>
            </div>

        </div>

    </div>


</template>

<style scoped>


</style>
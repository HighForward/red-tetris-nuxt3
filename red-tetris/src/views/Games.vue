<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { IGame, useGamesStore } from "@/stores/games";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/players";


const gamesStore = useGamesStore()
const { games } = storeToRefs(gamesStore)

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

const gameName = ref("")

onMounted(() => {
    gamesStore.getGames()
})

function joinGame(game: IGame) {
    return gamesStore.joinGame(game.uid, true)
}

function createGame() {
    return gamesStore.createGame(gameName.value)
}


</script>

<template>
    <div class="w-full">
        <div class="flex flex-col gap-8 justify-center w-full">
            <div class="flex flex-col rounded-md" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">
                <div class="gamesList flex flex-col flex-1 p-2 m-2 rounded overflow-hidden">
                    <h1 class="text-center text-content font-bold text-4xl my-2" style="">CREATE GAME</h1>
                    <form @submit.prevent="createGame" class="flex items-center flex-col w-full">
                        <input v-model="gameName" id="usernameInput" type="text" class="rounded-md w-full text-xl px-2 py-1 m-4 bg-base_light text-content_light outline-none border-none" placeholder="enter a game name">
                        <button class="buttonMulti flex py-2 mb-2 text-content text-4xl" style="">
                            <img class="imgTetrisMulti" src="@/assets/images/Tetromino_Z.svg">
                            <div class="title__gradient">CREATE</div>
                            <img class="imgTetrisMulti" src="@/assets/images/Tetromino_Z.svg">
                        </button>
                    </form>
                </div>
            </div>

            <div class="flex flexcol rounded-md" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">

                <div class="gamesList flex flex-col flex-1 p-2 m-2 rounded" >
                    <h1 class="text-center text-content font-bold text-4xl my-2">GAMES LIST</h1>
                    <div style="overflow-y: auto; min-height: 200px">
                        <div class="flex flex-col">
                            <div v-for="game in games" :key="game.uid" class="p-1 px-2 flex flex-row justify-between rounded-lg text-2xl hover:bg-base_light text-content_light">

                                <div class="flex items-center gap-2" style="height: 28px">
                                    <div>{{ game.name }}</div>
                                    <div class="inline-flex gap-1">
                                        <span v-if="game.owner.id === player.id">👑</span>
                                        <span v-if="game.players.filter(x => x.id === player.id).length === 1">👤</span>
                                    </div>
                                </div>

                                <div class="flex items-center">
                                    <span class="text-primary">[{{ game.state }}]</span><span>&nbsp[{{ game?.players?.length }}/8]</span>
                                    <button @click="joinGame(game)" class="px-2 ml-2 hover:text-content">PLAY</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

.buttonMulti:hover .imgTetrisMulti
{
    transform: rotate(380deg);
}

.imgTetrisMulti {
    @apply object-contain;
    width: 75px;
    height: 30px;
    transition: all 0.3s ease-in-out 0s;
}


</style>
<script lang="ts" setup>

import { useGamesStore } from "@/stores/games";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { IPlayer, usePlayerStore } from "@/stores/players";
import { RouterLink, useRoute } from "vue-router";
import { useBoardsStore } from "@/stores/boards";

const route = useRoute()

const gamesStore = useGamesStore()
const { game } = storeToRefs(gamesStore)

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

const boardsStore = useBoardsStore()
const { boards } = storeToRefs(boardsStore)

const player_hovered_id = ref("")
const tmpMessage = ref("")


onMounted(() => {

    const {
        game,
        player,
    } = route.params

    if (game && player) {

        playerStore.selectUsername(player as string)
        gamesStore.joinGame(game as string)
        gamesStore.getGame()
    }

})

function sendMessage() {
    gamesStore.sendMessage(tmpMessage.value)
    tmpMessage.value = ""
}

function triggerStartGame() {
    if (player.value?.id !== game.value?.owner?.id) {
        return
    }

    gamesStore.triggerStartGame()

}

function kickPlayer(targetPlayer: IPlayer) {
    if (showKickButton(targetPlayer)) {

        if (targetPlayer.id === player.value.id) {
            gamesStore.leaveGame()
        } else if (targetPlayer.id !== player.value.id) {
            gamesStore.kickFromGame(targetPlayer.id)
        }
    }
}

const showKickButton = (targetPlayer: IPlayer) => {
    return (player_hovered_id.value === targetPlayer.id && (game.value?.owner?.id === player.value.id || targetPlayer.id === player.value.id))
}

</script>


<template>
    <div v-if="!game" class="flex flex-col justify-center items-center text-content text-4xl font-bold gap-4">
        <span>This game does not exists....</span>
        <RouterLink to="/games" class="text-4xl font-bold text-content text-primary hover:underline">Back to Games</RouterLink>
    </div>
    <div v-else class="flex flex-col gap-8 justify-center w-full">

        <div class="flex flex-1 flex-col p-4 rounded-md" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35)">
            <h1 class="text-center text-content text-4xl font-bold">GAME RULES</h1>

            <div class="flex flex-col font-normal text-2xl">
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">name</span><span class="text-primary">{{ game.name }}</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">map</span><span class="text-primary">Tetris</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">board</span><span class="text-primary">20 x 10</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">players</span><span class="text-primary">{{ game.players?.length }} / 8</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">gamemode</span><span class="text-primary">Multiplayer</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">state</span><span class="text-primary">{{ game.state }}</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">owner</span><span class="text-primary">{{ game.owner.username }}</span></div>
                <div class="flex flex-row justify-between text-content_light"><span class="uppercase">uid</span><span class="text-primary">{{ game.uid }}</span></div>
            </div>

            <div v-if="game.owner.id === player.id && game.state === 'WAITING'" class="buttonGameHub flex flex-1 flex-row justify-center items-center mt-4">
                <img class="imgTetromino" src="@/assets/images/Tetromino_Z.svg">
                <button @click="triggerStartGame" class="py-2 text-4xl title__gradient">START GAMES</button>
                <img class="imgTetromino" src="@/assets/images/Tetromino_Z.svg">
            </div>
        </div>


        <div class="flex flex-1 flex-col p-4 rounded-md gap-4" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35)">
            <h1 class="text-center text-content text-4xl font-bold" style="">LISTE DES JOUEURS</h1>
            <div>
                <div class="listItem flex flex-row justify-between" v-for="listPlayer in game.players" :key="listPlayer.id">
                    <div @mouseover="player_hovered_id = listPlayer.id" @mouseleave="player_hovered_id = ''" class="w-full flex justify-between">
                        <div class="flex flex-row items-center gap-2">
                            - {{ listPlayer.username }}
                            <div class="inline-flex gap-1">
                                <span v-if="game.owner.id === listPlayer.id">👑</span>
                                <span v-if="listPlayer.id === player.id">👤</span>
                            </div>
                        </div>
                        <div class="flex flex-row items-center">
                            <img @click="kickPlayer(listPlayer)" v-if="showKickButton(listPlayer)" class="pl-2 cursor-pointer" style="height: 12px" src="@/assets/images/cross.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="listItem" v-for="n in (8 - Number(game.players?.length))">
                    <div>-</div>
                </div>

            </div>

            <form @submit.prevent="sendMessage" class="flex justify-end flex-col font-normal w-full">
                <div class="p-1 flex flex-col-reverse" style="overflow-y: auto; overflow-x: hidden; overflow-wrap: anywhere; height: 125px">
                    <div class="text-2xl text-content_light" v-for="msg in game?.chat" :key="msg">
                        <div>{{ msg }}</div>
                    </div>
                </div>
                <input id="pseudo" v-model="tmpMessage" placeholder="say hello =)" type="text" class="rounded-md w-full text-xl px-2 py-1 bg-base_light text-content_light outline-none border-none">
            </form>
        </div>


    </div>
</template>

<style scoped>

.listItem {
    @apply p-1 px-2 flex flex-row justify-between rounded-lg text-2xl hover:bg-base_light text-content_light;
}

.buttonGameHub {
    transition: all 0.3s ease-in-out 0s;
}

.buttonGameHub:hover {
    transform: scale(0.90);
}

.imgTetromino {
    @apply object-contain;
    width: 75px;
    height: 30px;
}

</style>
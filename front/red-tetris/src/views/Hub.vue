<script lang="ts" setup>

import { useGamesStore } from "@/stores/games";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { IPlayer, usePlayerStore } from "@/stores/players";

const gamesStore = useGamesStore()
const { game } = storeToRefs(gamesStore)

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)


const player_hovered_id = ref("")
const tmpMessage = ref("")


function sendMessage() {
    gamesStore.sendMessage(tmpMessage.value)
    tmpMessage.value = ""
}

function triggerStartGame() {
    if (player.value?.id !== game.value?.owner?.id) {
        // toast.error(`You can't start this game`)
        return
    }

    gamesStore.triggerStartGame()

}

function kickPlayer(targetPlayer: IPlayer) {
    if (showKickButton(targetPlayer)) {

        if (targetPlayer.id === player.value.id) {
            gamesStore.leaveGame()
        }
        else if (targetPlayer.id !== player.value.id) {
            gamesStore.kickFromGame(targetPlayer.id)
        }
    }
}

const showKickButton = (targetPlayer: IPlayer) => {
    return (player_hovered_id.value === targetPlayer.id && (game.value?.owner?.id === player.value.id || targetPlayer.id === player.value.id))
}

</script>


<template>
    <div v-if="!game" class="pt-12 flex justify-center">
        Loading game...
    </div>
    <div v-else class="flex justify-center pt-12 font-semibold">
        <div class="rounded-sm pb-4 px-2" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35)">
            <div class="flex justify-center py-2 font-semibold text-2xl">{{ game.name }}</div>

            <div class="flex flex-row">
                <div class="flex flex-col">


                    <div class="flex flex-col flex-1 p-2 m-2 border rounded">
                        <h1 class="text-center " style="">LISTE DES JOUEURS</h1>

                        <div class="listItem flex flex-row justify-between" v-for="listPlayer in game.players" :key="listPlayer.id">

                            <div @mouseover="player_hovered_id = listPlayer.id" @mouseleave="player_hovered_id = ''" class="w-full flex justify-between">

                                <div class="flex flex-row items-center">
                                    - {{ listPlayer.username }}
                                    <img v-if="listPlayer.id === player.id" class="pl-2" style="height: 12px" src="@/assets/images/user_apple.png" alt="">
                                </div>
                                <div class="flex flex-row items-center">
                                    <img @click="kickPlayer(listPlayer)" v-if="showKickButton(listPlayer)" class="pl-2 cursor-pointer" style="height: 12px" src="@/assets/images/cross.png" alt="">
                                </div>

                            </div>

                        </div>


                        <div class="px-2" v-for="n in (8 - Number(game.players?.length))">
                            <div >-</div>
                        </div>
                    </div>


                    <div class="flex flex-1 m-2 border rounded">
                        <form @submit.prevent="sendMessage" class="flex justify-end flex-col font-normal w-full">
                            <div class="p-1 flex flex-col-reverse" style="overflow-y: scroll; overflow-x: hidden; overflow-wrap: anywhere; height: 125px">
                                <div class="text-sm text-_light" v-for="msg in game?.chat" :key="msg">
                                    <div>{{ msg }}</div>
                                </div>
                            </div>
                            <input v-model="tmpMessage" class="pl-1" type="text">
                        </form>
                    </div>


                </div>


                <div class="flex flex-1 flex-col">
                    <div class="m-2 p-2 border rounded">
                        <h1 class="text-center text-_primary">GAME RULES</h1>

                        <div class="flex flex-col font-normal">
                            <div class="flex flex-row justify-between"><span>map</span><span >Tetris</span></div>
                            <div class="flex flex-row justify-between"><span>board</span><span >20 x 10</span></div>
                            <div class="flex flex-row justify-between"><span>players</span><span>{{ game.players?.length }}/8</span></div>
                            <div class="flex flex-row justify-between"><span>gamemode</span><span>multiplayer</span></div>
                            <div class="flex flex-row justify-between"><span>state</span><span>{{ game.state?.toLowerCase() }}</span></div>
                            <div class="flex flex-row justify-between"><span>owner</span><span>{{ game.owner.username }}</span></div>
                            <div class="flex flex-row justify-between"><span>uid</span><span>{{ game.uid }}</span></div>
                        </div>
                    </div>

                    <div class="buttonGameHub flex flex-1 flex-row justify-center items-center">
                        <img class="imgTetromino" src="@/assets/images/Tetromino_Z.svg">
                        <button @click="triggerStartGame" class="py-2 text-_primary font-bold text-2xl">START GAMES</button>
                        <img class="imgTetromino" src="@/assets/images/Tetromino_Z.svg">
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

.buttonGameHub {
    transition: all 0.3s ease-in-out 0s;
}

.buttonGameHub:hover
{
    transform: scale(0.90);
}

.imgTetromino {
    @apply object-contain;
    width: 75px;
    height: 30px;
}

</style>
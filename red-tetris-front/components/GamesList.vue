<script setup lang="ts">

import { useToast } from "vue-toastification";
import { useGames } from "#imports";
import { GameDTO } from "~/types/game.dto";
import { useHub } from "~/composables/hub";
import { useGamesListeners } from "~/composables/games";

let gameName: Ref<string> = ref('');

let games = useGames()
let hub = useHub()

const toast = useToast()
useGamesListeners()

const { $client } = useNuxtApp()

function navigateToGame(game: GameDTO) {
  hub.value = game
  navigateTo({
    path: '/hub',
    query: {
      uuid: game.uid
    }
  })
}

function joinGame(joined_game: GameDTO) {

  $client.emit("joinGame", joined_game.uid, (game: GameDTO) => {
    if (game) {
      navigateToGame(game)
    }
  })
}

function createGame() {

  if (!gameName.value || gameName.value.length < 2 || gameName.value.length > 15) {
    toast.error('You cannot create a game with this name')
    return
  }

  $client.emit('createGame', gameName.value, (game: GameDTO) => {
    if (game) {
      navigateToGame(game)
    }
  })
}

</script>

<template>
  <div class="w-full">
    <div class="flex justify-center w-full font-semibold">
      <div class="mt-12 flex flex-row" style="width: 900px; box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">

        <div class="gamesList flex flex-col flex-1 p-2 m-2 border rounded" style="border-color: #DDDDDD">
          <h1 class="text-center text-_primary my-2" style="">LISTE DES PARTIES</h1>
          <div style="overflow-y: scroll; height: 200px">
            <div class="flex flex-col text-_light">
              <div v-for="game in games" :key="game.uid" class="p-1 px-2 flex flex-row justify-between hover:bg-_gray text-_light hover:text-_secondary rounded-lg">

                <div class="LobbyFront flex justify-center items-center" style="height: 28px">
                  <div>{{ game.name }}</div>
<!--                  <img src="@/assets/images/couronne.png" alt="">-->
<!--                  <img src="@/assets/images/user.png" alt="">-->
                </div>

                <div class="flex items-center">
                  <span>[{{ game.state }}]</span><span>&nbsp[{{ game?.players?.length }}/8]</span>
                  <button @click="joinGame(game)" class="px-2 ml-2">rejoindre</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="gamesList flex flex-col flex-1 p-2 m-2 border rounded" style="border-color: #DDDDDD">
            <h1 class="text-center text-_primary my-2" style="">CREER UNE PARTIES</h1>
            <form @submit.prevent="createGame" class="flex items-center flex-col w-full">
              <input v-model="gameName" id="usernameInput" style="width: 300px" type="text" class="text-center rounded-sm px-2 py-1 m-4" placeholder="Nom de la partie">
              <button class="buttonMulti flex flex-row justify-around px-12 py-2 mb-2" style="">
                <img class="imgTetrisMulti" src="@/assets/images/Tetromino_Z.svg">
                <div class="font-semibold text-_primary">Créer la partie</div>
                <img class="imgTetrisMulti" src="@/assets/images/Tetromino_Z.svg">
              </button>
            </form>
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

.gamesList {
  width: 400px;
}

.LobbyFront img
{
  width: 28px;
  height: 28px;
  margin-left: 4px;
}

</style>
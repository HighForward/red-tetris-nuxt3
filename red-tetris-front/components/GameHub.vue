
<script setup lang="ts">
  import { GameDTO } from "~/types/game.dto";

  const player = usePlayer()
  const game = useGame()
  let player_hovered = null

  let tmp_message: Ref<string> = ref('')
  let chatMessages: Ref<[]> = ref([])

  onMounted(() => {

  })

  function sendMessage() {
    chatMessages.value.push(tmp_message.value)
  }

  function startLobby() {

  }

  function leaveLobby() {

  }

</script>

<template>
  <div v-if="!game" class="pt-12 flex justify-center">
    Loading game...
  </div>
  <div v-else class="flex justify-center pt-12 font-semibold">
    <div class="rounded-sm pb-4 px-2" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35)">
      <div class="flex justify-center py-2 font-semibold text-2xl text-_primary">{{ game.name }}</div>

      <div class="flex flex-row">
        <div class="flex flex-col">


          <div class="lobbyRow flex flex-col flex-1 p-2 m-2 border rounded border-_light">
            <h1 class="text-center text-_primary" style="">LISTE DES JOUEURS</h1>

            <div class="listItem flex flex-row justify-between" v-for="listPlayer in game.players">

              <div @mouseover="player_hovered = listPlayer" class="w-full">

                <div class="flex flex-row items-center">- {{ listPlayer.username }}
                  <img v-if="listPlayer.id === player.id" class="pl-2" style="height: 24px" src="@/assets/images/user.png" alt="">
                </div>

              </div>

            </div>


            <div class="px-2" v-for="n in (8 - game.players.length)">
              <div class="text-_light">-</div>
            </div>
          </div>


          <div class="lobbyRow flex flex-1 m-2 border rounded" style="border-color: #DDDDDD">
            <form @submit.prevent="sendMessage" class="flex justify-end border-black flex-col font-normal w-full">
              <div class="p-1" style="overflow-y: scroll; height: 125px">
                <div class="text-sm text-_light" v-for="msg in game?.chat">
                  <div>{{ msg }}</div>
                </div>
              </div>
              <input v-model="tmp_message" class="pl-1" type="text">
            </form>
          </div>


        </div>


        <div class="lobbyRow flex flex-1 flex-col">
          <div class="m-2 p-2 border rounded" style="border-color: #DDDDDD">
            <h1 class="text-center text-_primary">GAME RULES</h1>
            <div class="flex flex-col font-normal text-_light">
              <div class="flex flex-row justify-between"><span>map</span><span class="text-_secondary">Tetris</span></div>
              <div class="flex flex-row justify-between"><span>board</span><span class="text-_secondary">20 x 10</span>
              </div>
              <div class="flex flex-row justify-between"><span>players</span><span
                  class="text-_secondary">{{ game.players.length }}/8</span></div>
              <div class="flex flex-row justify-between"><span>gamemode</span><span
                  class="text-_secondary">multiplayer</span></div>
              <div class="flex flex-row justify-between"><span>state</span><span
                  class="text-_secondary">{{ game.state?.toLowerCase() }}</span></div>
              <div class="flex flex-row justify-between"><span>owner</span><span
                  class="text-_secondary">{{ game.owner.username }}</span></div>
              <div class="flex flex-row justify-between"><span>uid</span><span
                  class="text-_secondary">{{ game.uid }}</span></div>
            </div>
          </div>
<!--          <div class="flex flex-1 flex-col">-->

<!--            <div class="">-->
<!--              <h1 class="text-center text-orange">OPTIONS</h1>-->
<!--            </div>-->

<!--          </div>-->

          <div class="buttonGameHub flex flex-1 flex-row justify-center items-center">
            <img class="imgTetromino" src="@/assets/images/Tetromino_Z.svg">
            <button @click="startLobby" class="py-2 text-_primary font-bold text-2xl">START GAMES</button>
            <img class="imgTetromino" src="@/assets/images/Tetromino_Z.svg">
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.lobbyRow {
  width: 400px;
}

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
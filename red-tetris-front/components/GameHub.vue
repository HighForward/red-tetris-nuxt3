
<script setup lang="ts">
  import { PlayerDto } from "~/types/player.dto";
  import { useHubListeners } from "~/composables/hub";
  import { useHub } from "~/composables/hub";
  import { useToast } from "vue-toastification";

  const { $client } = useNuxtApp()

  const player = usePlayer()
  const hub = useHub()
  const toast = useToast()

  useHubListeners()

  let tmp_message: Ref<string> = ref('')
  let chatMessages: Ref<[]> = ref([])
  let player_hovered_id = ref("")


  function sendMessage() {
    $client.emit("sendMessage", tmp_message.value)
    tmp_message.value = ""
  }

  function startLobby() {
    if (player.value?.id !== hub.value?.owner?.id) {
      toast.error(`You can't start this game`)
      return
    }

    $client.emit("startGame")
  }

  function kickPlayer(targetPlayer: PlayerDto) {
    if (showKickButton(targetPlayer)) {

      if (targetPlayer.id === player.value.id) {
        $client.emit("leaveGame", (success: boolean) => {
          if (success)
            console.log(`you leaved this game`)
        })
      }
      else if (targetPlayer.id !== player.value.id) {
        $client.emit("kickPlayer", targetPlayer.id, (success: boolean) => {
          console.log(`player ${player.value.id} kicked`)
        })
      }
    }
  }

  const showKickButton = (targetPlayer: PlayerDto) => {
    return (player_hovered_id.value === targetPlayer.id && (hub.value?.owner?.id === player.value.id || targetPlayer.id === player.value.id))
  }

</script>

<template>
  <div v-if="!hub" class="pt-12 flex justify-center">
    Loading game...
  </div>
  <div v-else class="flex justify-center pt-12 font-semibold">
    <div class="rounded-sm pb-4 px-2" style="box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35)">
      <div class="flex justify-center py-2 font-semibold text-2xl text-_primary">{{ hub.name }}</div>

      <div class="flex flex-row">
        <div class="flex flex-col">


          <div class="lobbyRow flex flex-col flex-1 p-2 m-2 border rounded border-_light">
            <h1 class="text-center text-_primary" style="">LISTE DES JOUEURS</h1>

            <div class="listItem flex flex-row justify-between" v-for="listPlayer in hub.players" :key="listPlayer.id">

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


            <div class="px-2" v-for="n in (8 - Number(hub.players?.length))">
              <div class="text-_light">-</div>
            </div>
          </div>


          <div class="lobbyRow flex flex-1 m-2 border rounded" style="border-color: #DDDDDD">
            <form @submit.prevent="sendMessage" class="flex justify-end border-black flex-col font-normal w-full">
              <div class="p-1" style="overflow-y: scroll; overflow-x: hidden; overflow-wrap: anywhere; height: 125px">
                <div class="text-sm text-_light" v-for="msg in hub?.chat" :key="msg">
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
                  class="text-_secondary">{{ hub.players?.length }}/8</span></div>
              <div class="flex flex-row justify-between"><span>gamemode</span><span
                  class="text-_secondary">multiplayer</span></div>
              <div class="flex flex-row justify-between"><span>state</span><span
                  class="text-_secondary">{{ hub.state?.toLowerCase() }}</span></div>
              <div class="flex flex-row justify-between"><span>owner</span><span
                  class="text-_secondary">{{ hub.owner.username }}</span></div>
              <div class="flex flex-row justify-between"><span>uid</span><span
                  class="text-_secondary">{{ hub.uid }}</span></div>
            </div>
          </div>


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
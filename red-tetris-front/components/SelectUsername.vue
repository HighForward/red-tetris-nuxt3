<script setup lang="ts">

import { navigateTo } from "#imports";
import { useToast } from "vue-toastification";
import { usePlayer } from "~/composables/player";

  let tmp_username: Ref<string> = ref('');
  const { $client } = useNuxtApp()

  let player = usePlayer()
  let toast = useToast()

  function continueAsGuest() {
    $client.connect()
    $client.emit("continueAsGuest", (ret: UserDTO) => {
      player.value = ret
    })
    return navigateTo({ path: '/games' })
  }

  function continueWithUsername() {
    if (!tmp_username.value || tmp_username.value.length < 2 || tmp_username.value.length > 20) {
      toast.error(`Username ${tmp_username.value.length < 2 ? 'too short' : 'too long' }`)
      return
    }
    $client.connect()
    $client.emit("selectUsername" , tmp_username.value, (ret: UserDTO) => {
      player.value = ret
    })
    return navigateTo({ path: '/games' })
  }

</script>

<template>
  <div class="SelectUsernameModal">
    <form class="flex flex-col text-xl justify-center">
      <label for="pseudo" class="text-center text-_light pb-2">Entre ton pseudo</label>
      <input id="pseudo" v-model="tmp_username" placeholder="username" type="text" class="my-2 p-2 rounded-sm border rounded-sm text-smallgray border-smallgray">
      <button @click.prevent="continueWithUsername" class="GameModeButton">
        <img class="imgTetrisPseudo" src="@/assets/images/Tetromino_Z.svg">
        PLAY
        <img class="imgTetrisPseudo" src="@/assets/images/Tetromino_Z.svg">
      </button>
    </form>
    <button @click.prevent="continueAsGuest" class="guestButton">
      Continue as Guest
      <img class="imgTetrisPseudo ml-2" style="width: 18px; height: 18px" src="@/assets/images/Tetromino_O.svg">
    </button>
  </div>
</template>

<style scoped>

.SelectUsernameModal {
  @apply bg-_dark p-4 rounded-sm;
  box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.35);
  width: 400px;
}

.GameModeButton
{
  @apply flex flex-1 w-full justify-center text-center items-center text-_primary font-bold text-5xl;
  transition: 0.3s;
}

.GameModeButton:hover
{
  transform: scale(0.90);
}

.guestButton {
  @apply flex w-full justify-end items-center mt-4 text-_light
}

.guestButton:hover img
{
  transform: rotate(180deg);
}

.imgTetrisPseudo {
  @apply object-contain;
  width: 75px;
  height: 30px;
  transition: 0.3s;
}

</style>
<script setup lang="ts">

import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { usePlayerStore } from "@/stores/players";

const playersStore = usePlayerStore()

const router = useRouter()
const tmpUsername = ref("")

function goToPlay() {
    if (tmpUsername.value.length > 0) {
        playersStore.selectUsername(tmpUsername.value)
    }
    router.push({ path: '/games' })
}

</script>

<template>
    <div class="SelectUsernameModal">
        <form @submit.prevent="goToPlay" class="flex flex-col text-md justify-center">
            <label for="pseudo" class="grid text-center pb-2 text-content font-bold text-4xl">
                <span class="font-bold text-4xl">enter a username to join</span>
                <span class="text-xl text-content_light">or leave it blank to get a random one</span>

            </label>
            <input id="pseudo" v-model="tmpUsername" placeholder="username" type="text" class="rounded-md w-full text-xl px-2 py-1 bg-base_light text-content_light outline-none border-none">
            <button class="GameModeButton">
                <img class="imgTetrisPseudo" src="@/assets/images/Tetromino_Z.svg" alt="">
                PLAY
                <img class="imgTetrisPseudo" src="@/assets/images/Tetromino_Z.svg" alt="">
            </button>
        </form>
    </div>
</template>

<style scoped>

.SelectUsernameModal {
    @apply flex flex-col bg-base text-content p-4 rounded-md uppercase;
    box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.35);
    max-width: 600px;
}

.GameModeButton {
    @apply flex pt-4 flex-1 w-full justify-center text-center items-center text-4xl;
    transition: 0.3s;
}

.GameModeButton:hover {
    transform: scale(0.90);
}

.guestButton:hover img {
    transform: rotate(180deg);
}

.imgTetrisPseudo {
    @apply object-contain;
    width: 75px;
    height: 30px;
    transition: 0.3s;
}

</style>
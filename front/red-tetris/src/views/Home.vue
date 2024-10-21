<script setup lang="ts">

import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { usePlayerStore } from "@/stores/players";

const playersStore = usePlayerStore()

const router = useRouter()
const tmpUsername = ref("")

function changeUsername() {
    if (tmpUsername.value.length > 0) {
      playersStore.selectUsername(tmpUsername.value)
      router.push({ path: '/games' })
    }
}

</script>

<template>
    <div class="SelectUsernameModal">
        <form @submit.prevent="" class="flex flex-col text-xl justify-center">
            <label for="pseudo" class="text-center pb-2">Enter your username</label>
            <input id="pseudo" v-model="tmpUsername" placeholder="username" type="text" class="my-2 p-2 rounded-sm border rounded-sm">
            <button @click.prevent="changeUsername" class="GameModeButton">
                <img class="imgTetrisPseudo" src="@/assets/images/Tetromino_Z.svg" alt="">
                PLAY
                <img class="imgTetrisPseudo" src="@/assets/images/Tetromino_Z.svg" alt="">
            </button>
        </form>
        <RouterLink to="/games" class="guestButton">
            Continue without username
            <img class="imgTetrisPseudo ml-2" style="width: 18px; height: 18px" src="@/assets/images/Tetromino_O.svg" alt="">
        </RouterLink>

    </div>
</template>

<style scoped>

.SelectUsernameModal {
    @apply flex flex-col bg-base text-content p-4 rounded-md;
    box-shadow: 0 0 25px 5px rgba(0, 0, 0, 0.35);
}

.GameModeButton {
    @apply flex flex-1 w-full justify-center text-center items-center font-bold text-5xl;
    transition: 0.3s;
}

.GameModeButton:hover {
    transform: scale(0.90);
}

.guestButton {
    @apply flex w-full justify-end items-center mt-4
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
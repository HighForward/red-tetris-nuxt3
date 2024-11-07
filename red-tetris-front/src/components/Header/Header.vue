<script setup lang="ts">
import { RouterLink } from "vue-router";
import { usePlayerStore } from "@/stores/players";
import { storeToRefs } from "pinia";

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

</script>


<template>
    <div class="fixed w-full bg-base">
        <div class="flex w-full justify-between items-center px-8" style="height: var(--header_size); box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">
            <RouterLink to="/games" class="text-4xl font-bold text-content title__gradient">RED TETRIS</RouterLink>
            <RouterLink to="/" v-if="player" class="text-end text-xl">
                <span class="text-content_light">Connected as </span><span class="username text-content" id="test_username">{{ player.username }}</span>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>

</style>
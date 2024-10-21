<script setup lang="ts">
import { RouterLink } from "vue-router";
import { usePlayerStore } from "@/stores/players";
import { storeToRefs } from "pinia";

const playerStore = usePlayerStore()
const { player } = storeToRefs(playerStore)

</script>


<template>
    <div class="fixed w-full">
        <div class="flex w-full justify-between items-center px-8" style="height: var(--header_size); box-shadow: 0px 0px 25px 5px rgba(0, 0, 0, 0.35);">
            <RouterLink to="/" class="text-2xl font-bold text-content">Red Tetris</RouterLink>
            <div v-if="player">
                <span class="text-_light">Connected as </span><span class="text-content">{{ player.username }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
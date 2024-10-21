<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header/Header.vue";
import { connected, socket } from "@/composables/socket";
import { useGamesStore } from "@/stores/games";
import { usePlayerStore } from "@/stores/players";
import { useBoardsStore } from "@/stores/boards";

const gamesStore = useGamesStore()
const playersStore = usePlayerStore()
const boardsStore = useBoardsStore()


gamesStore.bindEvent()
playersStore.bindEvent()
boardsStore.bindEvent()

</script>

<template>
    <Header></Header>
    <div v-if="connected" class="main__container">
        <div class="page__container">
          <RouterView/>
        </div>
    </div>
</template>

<style scoped>

.main__container {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: var(--header_size);
}

.page__container {
    @apply p-[32px];
    max-width: 1260px;
    width: 100%;
}

</style>

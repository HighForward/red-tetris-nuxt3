import { GameDTO, GameState } from "~/types/game.dto";
import { useToast } from "vue-toastification";

export const useHub = () => useState<GameDTO>('hub', () => ({
    owner: {},
    players: [],
    state: GameState.WARMING,
    name: "",
    uid: "",
    chat: []
}))

export function useHubListeners() {
    const { $client } = useNuxtApp()
    const hub = useHub()
    const toast = useToast()

    function exitHub(): void {
        navigateTo('/games')
    }

    function updateHub(updatedHub: GameDTO): void {
        hub.value = updatedHub
    }

    function startGame() {
        toast.info('The Game will start')
        navigateTo('/play')
    }

    function listenHubEvents() {
        $client.on("exitHub", () => exitHub())
        $client.on("updateHub", (hub: GameDTO) => updateHub(hub))
        $client.on("startGame", () => startGame())
    }

    function removeHubEvents() {
        $client.off("exitHub")
        $client.off("updateHub")
        $client.off("startGame")
    }

    onMounted(() => {
        listenHubEvents()
    })

    onUnmounted(() => {
        removeHubEvents()
    })
}
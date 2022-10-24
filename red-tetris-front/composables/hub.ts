import { GameDTO, GameState } from "~/types/game.dto";

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

    function exitHub(): void {
        navigateTo('/games')
    }

    function updateHub(updatedHub: GameDTO): void {
        console.log("update hub")
        hub.value = updatedHub
    }

    function listenHubEvents() {
        $client.on("exitHub", () => exitHub())
        $client.on("updateHub", (hub: GameDTO) => updateHub(hub))
    }

    function removeHubEvents() {
        $client.off("exitHub")
        $client.off("updateHub")
    }

    onMounted(() => {
        listenHubEvents()
    })

    onUnmounted(() => {
        removeHubEvents()
    })
}
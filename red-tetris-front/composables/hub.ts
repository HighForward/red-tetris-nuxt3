import { GameDTO, GameState } from "~/types/game.dto";
import { useToast } from "vue-toastification";
import { BoardDTO } from "~/types/board.dto";

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
    const game_boards = useGameBoards()
    const toast = useToast()

    function exitHub(): void {
        navigateTo('/games')
    }

    function updateHub(updatedHub: GameDTO): void {
        hub.value = updatedHub
    }

    function startGame(boards: BoardDTO[]) {
        toast.info('The Game will start')
        game_boards.value = boards
        navigateTo('/play')
    }

    function listenHubEvents() {
        $client.on("exitHub", () => exitHub())
        $client.on("updateHub", (hub: GameDTO) => updateHub(hub))
        $client.on("startGame", (boards: BoardDTO[]) => startGame(boards))
    }

    function removeHubEvents() {
        $client.off("exitHub")
        $client.off("updateHub")
        $client.off("startGame")
    }

    onMounted(() => {
        $client.emit('getGame', (hub: GameDTO) => updateHub(hub))
        listenHubEvents()
    })

    onUnmounted(() => {
        removeHubEvents()
    })
}
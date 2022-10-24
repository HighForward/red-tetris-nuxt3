import { GameDTO } from "~/types/game.dto";

export const useGames = () => useState<GameDTO[]>('games', () => [])

export function useGamesListeners() {

    const { $client } = useNuxtApp()

    const games = useGames()

    function removeGame(removed_game: GameDTO) {
        const index: number = games.value.findIndex(game => game.uid === removed_game.uid)
        if (index !== -1) {
            games.value.splice(index, 1)
        }
    }

    function addGame(new_game: GameDTO) {
        console.log("adding game")
        games.value.push(new_game)
    }

    function updateGame(updated_game: GameDTO) {
        const index: number = games.value.findIndex(game => game.uid === updated_game.uid)
        if (index !== -1) {
            games.value[index] = updated_game
        }
    }

    function listenGamesListEvents() {
        $client.emit("getGames", (game_list: GameDTO[]) => games.value = game_list)
        $client.on("newGame", (new_game: GameDTO) => addGame(new_game))
        $client.on("removeGame", (removed_game: GameDTO) => removeGame(removed_game))
        $client.on("updateGame", (updated_game: GameDTO) => updateGame(updated_game))
    }

    function removeGamesListEvents() {
        $client.off("newGame")
        $client.off("removeGame")
        $client.off("updateGame")
    }

    onMounted(() => {
        console.log("listen listeners")
        listenGamesListEvents()
    })

    onUnmounted(() => {
        console.log("remove listeners")
        removeGamesListEvents()
    })
}
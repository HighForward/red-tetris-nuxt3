import { io } from 'socket.io-client';
import { GameDTO } from "~/types/game.dto";
import { PlayerDto } from "~/types/player.dto";
import { useGames } from "~/composables/games";

export default defineNuxtPlugin((nuxtApp) => {

    console.log("Loading socket.io")

    let games = useGames()

    const client = io('http://localhost:81', {
        autoConnect: false,
        transports: ['websocket'],
        upgrade: false
    });

    client.on("connection", (data: PlayerDto) => {
        console.log("client connected:", data);
    });

    client.on("newGame", (new_game: GameDTO) => {
        games.value.push(new_game)
    })

    client.on("removeGame", (removed_game: GameDTO) => {
        const index: number = games.value.findIndex(game => game.uid === removed_game.uid)
        if (index !== -1) {
            games.value.splice(index, 1)
        }
    })

    client.on("updateGame", (updated_game: GameDTO) => {
        const index: number = games.value.findIndex(game => game.uid === updated_game.uid)
        if (index !== -1) {
            games.value[index] = updated_game
        }
    })

    return {
        provide: {
            client
        }
    }





})

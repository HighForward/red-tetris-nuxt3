import { io } from 'socket.io-client';
import { GameDTO } from "~/types/game.dto";
import { PlayerDto } from "~/types/player.dto";
import { useGames } from "~/composables/games";

export default defineNuxtPlugin((nuxtApp) => {

    console.log("Loading socket.io")

    const client = io('http://localhost:81', {
        autoConnect: false,
        transports: ['websocket'],
        upgrade: false
    });

    client.on("connection", (data: PlayerDto) => {
        console.log("client connected:", data);
    });

    return {
        provide: {
            client,
        }
    }

})

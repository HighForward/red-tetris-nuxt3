import { io } from 'socket.io-client';
import { GameDTO } from "~/types/game.dto";
import { PlayerDto } from "~/types/player.dto";
import { useGames } from "~/composables/games";

export default defineNuxtPlugin((nuxtApp) => {

    const runtimeConfig = useRuntimeConfig()

    console.log("Loading socket.io")
    console.log(`http://${runtimeConfig.public.BACKEND_URL}:${runtimeConfig.public.WS_PORT}`)

    const client = io(`http://${runtimeConfig.public.BACKEND_URL}:${runtimeConfig.public.WS_PORT}`, {
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

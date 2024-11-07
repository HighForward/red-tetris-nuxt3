import { defineStore } from 'pinia'
import { socket } from "@/composables/socket";

export type IPlayer = {
    id: string,
    username: string
}

export const usePlayerStore = defineStore('players', {

    state: () : {
        player: IPlayer | null
    } => ({
        player: null
    }),
    getters: {

    },
    actions: {
        bindEvent() {
            socket.on('connect', () => {

                socket.on('connection', (player: IPlayer) => {
                    this.player = player
                })


            })
        },
        selectUsername(name: string) {
            socket.emit('selectUsername', name, (player: any) => {
                this.player = player
            })
        }
    },

})

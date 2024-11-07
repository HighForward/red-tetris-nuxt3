import { reactive, ref } from "vue";
import { io } from "socket.io-client";

export const connected = ref(false);

const URL = "http://localhost:8181";

export const socket = io(URL, { autoConnect: true });

socket.on("connect", () => {
    connected.value = true;
    console.log('WebSocket Initialized')
});

socket.on("disconnect", () => {
    connected.value = false;
});

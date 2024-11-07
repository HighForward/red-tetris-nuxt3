import { socket } from "@/composables/socket";
import { onMounted, onUnmounted } from "vue";

export function useKeyBoard() {

    let keySet: Record<string, boolean> = {
        "ArrowUp": false,
        "ArrowDown": false,
        "ArrowLeft": false,
        "ArrowRight": false,
        " ": false
    }

    function keyDownEvents(e: KeyboardEvent)
    {
        if (!keySet[e.key])
        {
            keySet[e.key] = true
            moveAction(e.key)
        }
    }

    function keyUpEvents(e: KeyboardEvent)
    {
        keySet[e.key] = false
    }

    function moveAction(key: string)
    {
        if (keySet['ArrowUp'] && key === 'ArrowUp') {
            socket.emit('rotateBlock')
        }
        else if (keySet['ArrowLeft'] && key === 'ArrowLeft') {
            socket.emit('translateBlock', -1)
        }
        else if (keySet['ArrowRight'] && key ==='ArrowRight') {
            socket.emit('translateBlock', 1)
        }
        else if (keySet['ArrowDown'] && key === 'ArrowDown') {
            socket.emit('fastDown')
        }
        else if (keySet[' '] && key === ' ') {
            socket.emit('instantDown')
        }
    }

    function keyDownEventListener(e: KeyboardEvent) {
        e.preventDefault()
        keyDownEvents(e)
    }

    function keyUpEventListener(e: KeyboardEvent) {
        e.preventDefault()
        keyUpEvents(e)
    }

    onMounted(() =>  {
        document.addEventListener('keydown', keyDownEventListener )
        document.addEventListener('keyup', keyUpEventListener )
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', keyDownEventListener )
        document.removeEventListener('keyup', keyUpEventListener )

    })

    return { keyUpEventListener, keyDownEventListener }

}
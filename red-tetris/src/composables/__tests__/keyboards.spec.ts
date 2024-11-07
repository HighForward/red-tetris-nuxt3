import { describe, expect, test } from "vitest";
import { useKeyBoard } from "../keyboard";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import router from "../../router";
import Play from "../../views/Play.vue";

describe('Keyboards', async () => {

    const wrapper = mount(Play, {
        global: {
            plugins: [
                createTestingPinia(),
                router
            ],
        },
    })

    test('increments the current number by 1', async () => {

        const { keyDownEventListener, keyUpEventListener } = useKeyBoard()


        keyDownEventListener({ key: 'ArrowUp', preventDefault() {} } as KeyboardEvent)
        keyUpEventListener({ key: 'ArrowUp', preventDefault() {} } as KeyboardEvent)


    })
})
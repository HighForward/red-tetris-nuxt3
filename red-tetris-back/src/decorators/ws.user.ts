
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsException } from "@nestjs/websockets";

export const WsUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const client = ctx.switchToWs().getClient();
        if (client.player)
            return client.player

        throw new WsException('player not found')
    },
);
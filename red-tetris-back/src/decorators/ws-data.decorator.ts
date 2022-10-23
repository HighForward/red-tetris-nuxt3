
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsException } from "@nestjs/websockets";

export const WsData = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        return ctx.switchToWs().getData();
    },
);
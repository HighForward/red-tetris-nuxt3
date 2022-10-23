import { GameDTO } from "~/types/game.dto";

export interface PlayerDto
{
    id?: string;
    username?: string;
    type?: PlayerType
}

export enum PlayerType
{
    GUEST = 'GUEST',
    USERNAME = 'USERNAME',
}
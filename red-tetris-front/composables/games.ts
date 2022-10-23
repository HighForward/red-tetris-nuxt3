import { GameDTO } from "~/types/game.dto";

export const useGames = () => useState<GameDTO[]>('games', () => new Array<GameDTO>)

export const useGame = () => useState<GameDTO>('game', () => new Object)
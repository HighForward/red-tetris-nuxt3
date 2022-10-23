import { PlayerDto } from "~/types/player.dto";

export const usePlayer = () => useState<PlayerDto>('player', () => new Object)
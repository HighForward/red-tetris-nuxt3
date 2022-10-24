import { PlayerDto, PlayerType } from "~/types/player.dto";

export const usePlayer = () => useState<PlayerDto>('player', () => ({
    id: "",
    username: "",
    type: PlayerType.GUEST
}))
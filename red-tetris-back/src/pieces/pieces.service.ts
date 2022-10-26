import { Injectable } from '@nestjs/common';
import { Piece } from "./piece";

@Injectable()
export class PiecesService {

    generatePiecesPattern() : Piece[] {
        let pieces: Piece[] = []

        for (let i = 0; i < 200; i++) {
            pieces.push(new Piece())
        }
        return pieces
    }

}

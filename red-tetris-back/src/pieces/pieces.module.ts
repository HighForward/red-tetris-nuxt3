import { Module } from '@nestjs/common';
import { PiecesService } from './pieces.service';

@Module({
  providers: [PiecesService],
    exports: [PiecesService]
})
export class PiecesModule {}

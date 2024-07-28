import { Module } from '@nestjs/common';
import { PecaService } from './peca.service';
import { PecaController } from './peca.controller';
import { Pecas } from './entities/peca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PecaController],
  providers: [PecaService],
  imports: [TypeOrmModule.forFeature([Pecas])],
})
export class PecaModule {}

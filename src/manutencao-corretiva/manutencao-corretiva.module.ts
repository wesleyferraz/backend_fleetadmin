import { Module } from '@nestjs/common';
import { ManutencaoCorretivaService } from './manutencao-corretiva.service';
import { ManutencaoCorretivaController } from './manutencao-corretiva.controller';
import { ManutencaoCorretiva } from './entities/manutencao-corretiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ManutencaoCorretivaController],
  providers: [ManutencaoCorretivaService],
  imports: [TypeOrmModule.forFeature([ManutencaoCorretiva])],
})
export class ManutencaoCorretivaModule {}

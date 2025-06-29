import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abastecimento } from 'src/abastecimento/entities/abastecimento.entity';
import { Viagem } from 'src/viagem/entity/viagem.entity';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Seguros } from 'src/seguro/entities/seguro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Viagem,
      Abastecimento,
      ManutencoesCorretivas,
      Seguros,
    ]),
  ],
  providers: [OverviewService],
  controllers: [OverviewController],
})
export class OverviewModule {}

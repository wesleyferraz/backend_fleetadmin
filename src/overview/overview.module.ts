import { Module } from '@nestjs/common';
import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combustivel } from 'src/combustivel/entities/combustivel.entity';
import { Faturamento } from 'src/faturamento/entity/faturamento.entity';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Seguros } from 'src/seguro/entities/seguro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Faturamento,
      Combustivel,
      ManutencoesCorretivas,
      Seguros,
    ]),
  ],
  providers: [OverviewService],
  controllers: [OverviewController],
})
export class OverviewModule {}

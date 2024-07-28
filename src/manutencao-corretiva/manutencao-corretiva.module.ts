import { Module } from '@nestjs/common';
import { ManutencaoCorretivaService } from './manutencao-corretiva.service';
import { ManutencaoCorretivaController } from './manutencao-corretiva.controller';
import { ManutencoesCorretivas } from './entities/manutencao-corretiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oficinas } from 'src/oficina/entities/oficina.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Module({
  controllers: [ManutencaoCorretivaController],
  providers: [ManutencaoCorretivaService],
  imports: [
    TypeOrmModule.forFeature([ManutencoesCorretivas]),
    TypeOrmModule.forFeature([Oficinas]),
    TypeOrmModule.forFeature([Veiculos]),
  ],
})
export class ManutencaoCorretivaModule {}

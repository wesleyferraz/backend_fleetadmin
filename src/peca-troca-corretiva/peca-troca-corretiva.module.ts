import { Module } from '@nestjs/common';
import { PecaTrocaCorretivaService } from './peca-troca-corretiva.service';
import { PecaTrocaCorretivaController } from './peca-troca-corretiva.controller';
import { PecasTrocadasCorretiva } from './entities/peca-troca-corretiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Pecas } from 'src/peca/entities/peca.entity';

@Module({
  controllers: [PecaTrocaCorretivaController],
  providers: [PecaTrocaCorretivaService],
  imports: [
    TypeOrmModule.forFeature([PecasTrocadasCorretiva]),
    TypeOrmModule.forFeature([ManutencoesCorretivas]),
    TypeOrmModule.forFeature([Pecas]),
  ],
})
export class PecaTrocaCorretivaModule {}

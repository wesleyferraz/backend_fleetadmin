import { Module } from '@nestjs/common';
import { OleoTrocaCorretivaController } from './oleo-troca-corretiva.controller';
import { OleoTrocaCorretivaService } from './oleo-troca-corretiva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { OleoTrocadoCorretiva } from './entities/oleo-troca-corretiva.entity';
import { Oleo } from 'src/oleo/entities/oleo.entity';

@Module({
  controllers: [OleoTrocaCorretivaController],
  providers: [OleoTrocaCorretivaService],
  imports: [
    TypeOrmModule.forFeature([OleoTrocadoCorretiva]),
    TypeOrmModule.forFeature([ManutencoesCorretivas]),
    TypeOrmModule.forFeature([Oleo]),
  ],
})
export class OleoTrocaCorretivaModule {}

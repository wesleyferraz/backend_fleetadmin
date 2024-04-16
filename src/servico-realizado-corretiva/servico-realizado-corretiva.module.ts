import { Module } from '@nestjs/common';
import { ServicoRealizadoCorretivaService } from './servico-realizado-corretiva.service';
import { ServicoRealizadoCorretivaController } from './servico-realizado-corretiva.controller';
import { ServicoRealizadoCorretiva } from './entities/servico-realizado-corretiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ServicoRealizadoCorretivaController],
  providers: [ServicoRealizadoCorretivaService],
  imports: [TypeOrmModule.forFeature([ServicoRealizadoCorretiva])],
})
export class ServicoRealizadoCorretivaModule {}

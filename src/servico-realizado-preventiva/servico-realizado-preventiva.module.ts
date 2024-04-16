import { Module } from '@nestjs/common';
import { ServicoRealizadoPreventivaService } from './servico-realizado-preventiva.service';
import { ServicoRealizadoPreventivaController } from './servico-realizado-preventiva.controller';
import { ServicoRealizadoPreventiva } from './entities/servico-realizado-preventiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ServicoRealizadoPreventivaController],
  providers: [ServicoRealizadoPreventivaService],
  imports: [TypeOrmModule.forFeature([ServicoRealizadoPreventiva])],
})
export class ServicoRealizadoPreventivaModule {}

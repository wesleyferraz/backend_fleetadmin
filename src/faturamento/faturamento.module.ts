import { Module } from '@nestjs/common';
import { FaturamentoController } from './faturamento.controller';
import { FaturamentoService } from './faturamento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faturamento } from './entity/faturamento.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Motoristas } from 'src/motorista/entities/motorista.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Module({
  controllers: [FaturamentoController],
  providers: [FaturamentoService],
  imports: [
    TypeOrmModule.forFeature([Faturamento]),
    TypeOrmModule.forFeature([Fornecedor]),
    TypeOrmModule.forFeature([Motoristas]),
    TypeOrmModule.forFeature([Veiculos]),
  ],
})
export class FaturamentoModule {}

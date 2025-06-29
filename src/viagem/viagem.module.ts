import { Module } from '@nestjs/common';
import { ViagemController } from './viagem.controller';
import { ViagemService } from './viagem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viagem } from './entity/viagem.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Motoristas } from 'src/motorista/entities/motorista.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService],
  imports: [
    TypeOrmModule.forFeature([Viagem]),
    TypeOrmModule.forFeature([Fornecedor]),
    TypeOrmModule.forFeature([Motoristas]),
    TypeOrmModule.forFeature([Veiculos]),
  ],
})
export class ViagemModule {}

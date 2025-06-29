import { Module } from '@nestjs/common';
import { AbastecimentoService } from './abastecimento.service';
import { AbastecimentoController } from './abastecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abastecimento } from './entities/abastecimento.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Postos } from 'src/posto/entities/postos.entity';

@Module({
  providers: [AbastecimentoService],
  controllers: [AbastecimentoController],
  imports: [
    TypeOrmModule.forFeature([Abastecimento]),
    TypeOrmModule.forFeature([Veiculos]),
    TypeOrmModule.forFeature([Postos]),
  ],
})
export class AbastecimentoModule {}

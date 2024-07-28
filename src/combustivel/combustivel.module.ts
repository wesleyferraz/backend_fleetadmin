import { Module } from '@nestjs/common';
import { CombustivelService } from './combustivel.service';
import { CombustivelController } from './combustivel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Combustivel } from './entities/combustivel.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Postos } from 'src/posto/entities/postos.entity';

@Module({
  providers: [CombustivelService],
  controllers: [CombustivelController],
  imports: [
    TypeOrmModule.forFeature([Combustivel]),
    TypeOrmModule.forFeature([Veiculos]),
    TypeOrmModule.forFeature([Postos]),
  ],
})
export class CombustivelModule {}

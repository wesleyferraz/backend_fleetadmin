import { Module } from '@nestjs/common';
import { PneuService } from './pneu.service';
import { PneuController } from './pneu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Pneu } from './entities/pneu.entity';

@Module({
  providers: [PneuService],
  controllers: [PneuController],
  imports: [
    TypeOrmModule.forFeature([Pneu]),
    TypeOrmModule.forFeature([Veiculos]),
  ],
})
export class PneuModule {}

import { Module } from '@nestjs/common';
import { SeguroService } from './seguro.service';
import { SeguroController } from './seguro.controller';
import { Seguros } from './entities/seguro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seguradoras } from 'src/seguradora/entities/seguradora.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Module({
  controllers: [SeguroController],
  providers: [SeguroService],
  imports: [
    TypeOrmModule.forFeature([Seguros]),
    TypeOrmModule.forFeature([Seguradoras]),
    TypeOrmModule.forFeature([Veiculos]),
  ],
})
export class SeguroModule {}

import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { Veiculos } from './entities/veiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VeiculoController],
  providers: [VeiculoService],
  imports: [TypeOrmModule.forFeature([Veiculos])],
})
export class VeiculoModule {}

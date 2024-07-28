import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { Motoristas } from './entities/motorista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Module({
  controllers: [MotoristaController],
  providers: [MotoristaService],
  imports: [
    TypeOrmModule.forFeature([Motoristas]),
    TypeOrmModule.forFeature([Enderecos]),
  ],
})
export class MotoristaModule {}

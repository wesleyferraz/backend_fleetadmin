import { Module } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { MotoristaController } from './motorista.controller';
import { Motorista } from './entities/motorista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MotoristaController],
  providers: [MotoristaService],
  imports: [TypeOrmModule.forFeature([Motorista])],
})
export class MotoristaModule {}

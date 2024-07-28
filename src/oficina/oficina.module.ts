import { Module } from '@nestjs/common';
import { OficinaService } from './oficina.service';
import { OficinaController } from './oficina.controller';
import { Oficinas } from './entities/oficina.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Module({
  controllers: [OficinaController],
  providers: [OficinaService],
  imports: [
    TypeOrmModule.forFeature([Oficinas]),
    TypeOrmModule.forFeature([Enderecos]),
  ],
})
export class OficinaModule {}

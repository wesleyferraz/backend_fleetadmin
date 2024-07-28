import { Module } from '@nestjs/common';
import { SeguradoraService } from './seguradora.service';
import { SeguradoraController } from './seguradora.controller';
import { Seguradoras } from './entities/seguradora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Module({
  controllers: [SeguradoraController],
  providers: [SeguradoraService],
  imports: [
    TypeOrmModule.forFeature([Seguradoras]),
    TypeOrmModule.forFeature([Enderecos]),
  ],
})
export class SeguradoraModule {}

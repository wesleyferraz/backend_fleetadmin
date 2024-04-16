import { Module } from '@nestjs/common';
import { SeguradoraService } from './seguradora.service';
import { SeguradoraController } from './seguradora.controller';
import { Seguradora } from './entities/seguradora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SeguradoraController],
  providers: [SeguradoraService],
  imports: [TypeOrmModule.forFeature([Seguradora])],
})
export class SeguradoraModule {}

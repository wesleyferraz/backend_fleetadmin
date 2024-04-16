import { Module } from '@nestjs/common';
import { PecaService } from './peca.service';
import { PecaController } from './peca.controller';
import { Peca } from './entities/peca.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PecaController],
  providers: [PecaService],
  imports: [TypeOrmModule.forFeature([Peca])],
})
export class PecaModule {}

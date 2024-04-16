import { Module } from '@nestjs/common';
import { PecaTrocaCorretivaService } from './peca-troca-corretiva.service';
import { PecaTrocaCorretivaController } from './peca-troca-corretiva.controller';
import { PecaTrocaCorretiva } from './entities/peca-troca-corretiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PecaTrocaCorretivaController],
  providers: [PecaTrocaCorretivaService],
  imports: [TypeOrmModule.forFeature([PecaTrocaCorretiva])],
})
export class PecaTrocaCorretivaModule {}

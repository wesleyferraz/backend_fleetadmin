import { Module } from '@nestjs/common';
import { PecaTrocaPreventivaService } from './peca-troca-preventiva.service';
import { PecaTrocaPreventivaController } from './peca-troca-preventiva.controller';
import { PecaTrocaPreventiva } from './entities/peca-troca-preventiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PecaTrocaPreventivaController],
  providers: [PecaTrocaPreventivaService],
  imports: [TypeOrmModule.forFeature([PecaTrocaPreventiva])],
})
export class PecaTrocaPreventivaModule {}

import { Module } from '@nestjs/common';
import { ManutencaoPreventivaService } from './manutencao-preventiva.service';
import { ManutencaoPreventivaController } from './manutencao-preventiva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManutencaoPreventiva } from './entities/manutencao-preventiva.entity';

@Module({
  controllers: [ManutencaoPreventivaController],
  providers: [ManutencaoPreventivaService],
  imports: [TypeOrmModule.forFeature([ManutencaoPreventiva])],
})
export class ManutencaoPreventivaModule {}

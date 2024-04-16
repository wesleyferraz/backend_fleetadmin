import { Module } from '@nestjs/common';
import { ServicoManutencaoService } from './servico-manutencao.service';
import { ServicoManutencaoController } from './servico-manutencao.controller';
import { ServicoManutencao } from './entities/servico-manutencao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ServicoManutencaoController],
  providers: [ServicoManutencaoService],
  imports: [TypeOrmModule.forFeature([ServicoManutencao])],
})
export class ServicoManutencaoModule {}

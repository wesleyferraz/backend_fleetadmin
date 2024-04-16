import { Module } from '@nestjs/common';
import { InfracaoService } from './infracao.service';
import { InfracaoController } from './infracao.controller';
import { Infracao } from './entities/infracao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InfracaoController],
  providers: [InfracaoService],
  imports: [TypeOrmModule.forFeature([Infracao])],
})
export class InfracaoModule {}

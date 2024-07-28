import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';
import { PostoService } from './posto.service';
import { PostoController } from './posto.controller';
import { Postos } from './entities/postos.entity';

@Module({
  controllers: [PostoController],
  providers: [PostoService],
  imports: [
    TypeOrmModule.forFeature([Postos]),
    TypeOrmModule.forFeature([Enderecos]),
  ],
})
export class PostoModule {}

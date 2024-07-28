import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { Fornecedor } from './entities/fornecedor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Module({
  controllers: [FornecedorController],
  providers: [FornecedorService],
  imports: [
    TypeOrmModule.forFeature([Fornecedor]),
    TypeOrmModule.forFeature([Enderecos]),
  ],
})
export class FornecedorModule {}

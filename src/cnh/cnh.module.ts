import { Module } from '@nestjs/common';
import { CnhService } from './cnh.service';
import { CnhController } from './cnh.controller';
import { CNH } from './entities/cnh.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CnhController],
  providers: [CnhService],
  imports: [TypeOrmModule.forFeature([CNH])],
})
export class CnhModule {}

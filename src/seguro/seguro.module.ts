import { Module } from '@nestjs/common';
import { SeguroService } from './seguro.service';
import { SeguroController } from './seguro.controller';
import { Seguro } from './entities/seguro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [SeguroController],
  providers: [SeguroService],
  imports: [TypeOrmModule.forFeature([Seguro])],
})
export class SeguroModule {}

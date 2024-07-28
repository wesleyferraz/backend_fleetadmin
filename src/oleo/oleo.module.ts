import { Module } from '@nestjs/common';
import { OleoController } from './oleo.controller';
import { OleoService } from './oleo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Oleo } from './entities/oleo.entity';

@Module({
  controllers: [OleoController],
  providers: [OleoService],
  imports: [TypeOrmModule.forFeature([Oleo])],
})
export class OleoModule {}

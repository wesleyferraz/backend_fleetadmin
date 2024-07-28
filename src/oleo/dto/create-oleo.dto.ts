import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOleoDto {
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  volume: string;

  @ApiProperty()
  marca: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  aplicabilidade: string;
}

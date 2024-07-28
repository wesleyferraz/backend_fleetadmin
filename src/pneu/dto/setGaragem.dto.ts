import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class SetPneuDto {
  @ApiProperty()
  @IsNumber()
  veiculoId: number;

  @ApiProperty()
  posicao: number;
}

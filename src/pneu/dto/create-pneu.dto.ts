import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePneuDto {
  @ApiProperty()
  marca: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  tipo_de_borracha: string;

  @ApiProperty()
  recapagem: number;

  @ApiProperty()
  local_de_instalacao: string;

  @ApiProperty()
  referencia: string;

  @ApiProperty()
  @IsNumber()
  veiculoId: number;

  @ApiProperty()
  posicao: number;
}

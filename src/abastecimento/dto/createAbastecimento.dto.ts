import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAbastecimentoDto {
  @ApiProperty()
  tipo: string;

  @ApiProperty()
  volume: number;

  @ApiProperty()
  km_inicial: number;

  @ApiProperty()
  km_final: number;

  @ApiProperty()
  consumo: number;

  @ApiProperty()
  valor_unitario: number;

  @ApiProperty()
  valor_total: number;

  @ApiProperty()
  data: Date;

  @IsNumber()
  @ApiProperty()
  veiculo_id: number;

  @IsNumber()
  @ApiProperty()
  posto_id: number;
}

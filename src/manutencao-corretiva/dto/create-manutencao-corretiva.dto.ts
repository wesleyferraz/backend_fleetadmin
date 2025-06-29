// create-manutencao-corretiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateManutencaoCorretivaDto {
  @ApiProperty()
  data: Date;

  @ApiProperty()
  kmManutencao: number;

  @ApiProperty()
  kmProximaManutencao: number;

  @ApiProperty()
  valorTotal: number;

  @ApiProperty()
  oficinaId: number;

  @ApiProperty()
  veiculoId: number;
}

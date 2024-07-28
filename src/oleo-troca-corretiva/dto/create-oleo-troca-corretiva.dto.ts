// create-oleo-troca-corretiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateOleoTrocadaCorretivaDto {
  @ApiProperty()
  manutencaoCorretivaId: number;

  @ApiProperty()
  oleoId: number;

  @ApiProperty()
  quantidade: number;

  @ApiProperty()
  valorUnitario: number;

  @ApiProperty()
  valorTotal: number;
}

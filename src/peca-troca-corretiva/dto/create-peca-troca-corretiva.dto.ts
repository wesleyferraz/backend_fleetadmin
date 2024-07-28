// create-peca-troca-corretiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePecaTrocadaCorretivaDto {
  @ApiProperty()
  manutencaoCorretivaId: number;

  @ApiProperty()
  pecaId: number;

  @ApiProperty()
  quantidade: number;

  @ApiProperty()
  valorUnitario: number;

  @ApiProperty()
  valorTotal: number;
}

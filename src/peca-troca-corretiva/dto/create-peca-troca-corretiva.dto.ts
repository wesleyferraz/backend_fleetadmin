// create-peca-troca-corretiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePecaTrocaCorretivaDto {
  @ApiProperty()
  manutencao_corretiva_id: number;

  @ApiProperty()
  peca_id: number;

  @ApiProperty()
  valor: number;
}

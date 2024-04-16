// create-peca-troca-preventiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePecaTrocaPreventivaDto {
  @ApiProperty()
  manutencao_preventiva_id: number;

  @ApiProperty()
  peca_id: number;

  @ApiProperty()
  valor: number;
}

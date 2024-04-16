// create-manutencao-corretiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';
export class CreateManutencaoCorretivaDto {
  @ApiProperty()
  data: Date;

  @ApiProperty()
  kmManutencao: number;

  @ApiProperty()
  valorTotal: number;

  @ApiProperty()
  oficina_id: number;

  @ApiProperty()
  veiculo_id: number;
}

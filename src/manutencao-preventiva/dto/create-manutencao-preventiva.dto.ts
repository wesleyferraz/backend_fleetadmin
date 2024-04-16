// create-manutencao-preventiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateManutencaoPreventivaDto {
  @ApiProperty()
  data: Date;

  @ApiProperty()
  kmManutencao: number;

  @ApiProperty()
  kmProximaManutencao: number;

  @ApiProperty()
  valor: number;

  @ApiProperty()
  oficina_id: number;

  @ApiProperty()
  veiculo_id: number;
}

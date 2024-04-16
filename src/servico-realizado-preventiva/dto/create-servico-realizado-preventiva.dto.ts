// create-servico-realizado-preventiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoRealizadoPreventivaDto {
  @ApiProperty()
  manutencao_preventiva_id: number;

  @ApiProperty()
  servico_id: number;

  @ApiProperty()
  valor: number;
}

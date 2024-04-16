// create-servico-realizado-corretiva.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoRealizadoCorretivaDto {
  @ApiProperty()
  manutencao_corretiva_id: number;

  @ApiProperty()
  servico_id: number;

  @ApiProperty()
  valor: number;
}

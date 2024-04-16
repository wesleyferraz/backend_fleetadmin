// create-servico-manutencao.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoManutencaoDto {
  @ApiProperty()
  descricao: string;
}

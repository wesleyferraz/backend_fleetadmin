// create-infracao.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateInfracaoDto {
  @ApiProperty()
  data: Date;

  @ApiProperty()
  hora: string;

  @ApiProperty()
  tipo: string;

  @ApiProperty()
  local: string;

  @ApiProperty()
  numeroMulta: string;

  @ApiProperty()
  valorMulta: number;

  @ApiProperty()
  situacao: string;

  @ApiProperty()
  veiculo_id: string;

  @ApiProperty()
  motorista_cpf: string;

  @ApiProperty()
  observacoes: string;
}

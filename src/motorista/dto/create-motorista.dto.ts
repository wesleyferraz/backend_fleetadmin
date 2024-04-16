// create-motorista.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateMotoristaDto {
  @ApiProperty()
  cpf: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  sobrenome: string;

  @ApiProperty()
  endereco_id: number;

  @ApiProperty()
  celular: string;

  @ApiProperty()
  foto_path: string;

  @ApiProperty()
  certificacoes_id: string;
}

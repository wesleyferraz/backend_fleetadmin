// create-motorista.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateMotoristaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  rg: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  sobrenome: string;

  @ApiProperty()
  enderecoId: number;

  @ApiProperty()
  celular: string;

  @ApiProperty()
  numeroRegistroCnh: number;

  @ApiProperty()
  categoriaCnh: string;

  @ApiProperty()
  dataVencimentoCnh: Date;
}

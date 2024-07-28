// create-endereco.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @ApiProperty()
  logradouro: string;

  @ApiProperty()
  numero: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  cep: string;
}

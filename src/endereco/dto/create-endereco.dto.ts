// create-endereco.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @ApiProperty()
  rua: string;

  @ApiProperty()
  numero: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  pais: string;

  @ApiProperty()
  cep: string;
}

// create-seguradora.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeguradoraDto {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  razaoSocial: string;

  @ApiProperty()
  endereco_id: number;
}

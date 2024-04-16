// create-oficina.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateOficinaDto {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  razaoSocial: string;

  @ApiProperty()
  endereco_id: number;
}

// create-peca.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreatePecaDto {
  @ApiProperty()
  fabricante: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  valor: number;
}

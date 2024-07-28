import { ApiProperty } from '@nestjs/swagger';

export class CreatePostoDto {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  razaoSocial: string;

  @ApiProperty()
  enderecoId: number;
}

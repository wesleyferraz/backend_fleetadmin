// create-Fornecedor.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateFornecedorDto {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  razaoSocial: string;

  @ApiProperty()
  enderecoId: number;
}

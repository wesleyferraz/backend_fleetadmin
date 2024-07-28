// create-seguro.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeguroDto {
  @ApiProperty()
  seguradoraId: number;

  @ApiProperty()
  numeroContrato: string;

  @ApiProperty()
  dataVencimento: Date;

  @ApiProperty()
  valorMensal: number;

  @ApiProperty()
  veiculoId: number;
}

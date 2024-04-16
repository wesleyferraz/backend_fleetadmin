// create-seguro.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateSeguroDto {
  @ApiProperty()
  seguradora_id: number;

  @ApiProperty()
  numeroContrato: string;

  @ApiProperty()
  dataVencimento: Date;

  @ApiProperty()
  valorMensal: number;

  @ApiProperty()
  veiculo_id: number;
}

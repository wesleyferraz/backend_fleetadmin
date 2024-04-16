// create-veiculo.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateVeiculoDto {
  @ApiProperty()
  placa: string;

  @ApiProperty()
  chassi: string;

  @ApiProperty()
  modelo: string;

  @ApiProperty()
  marca: string;

  @ApiProperty()
  cor: string;

  @ApiProperty()
  anoFabricacao: number;

  @ApiProperty()
  anoModelo: number;

  @ApiProperty()
  dataVencimentoLicenciamento: Date;

  @ApiProperty()
  cargaMaxima: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateViagemDto {
  @IsString()
  @ApiProperty()
  notaFiscal: string;

  @IsString()
  @ApiProperty()
  origem: string;

  @IsString()
  @ApiProperty()
  destino: string;

  @IsDate()
  @ApiProperty()
  dataCarregamento: Date;

  @IsDate()
  @ApiProperty()
  dataDescarregamento: Date;

  @IsNumber()
  @ApiProperty()
  valorUnitario: number;

  @IsNumber()
  @ApiProperty()
  valorTotal: number;

  @IsNumber()
  @ApiProperty()
  volumeTransportado: number;

  @IsNumber()
  @ApiProperty()
  remuneracaoMotorista: number;

  @IsNumber()
  @ApiProperty()
  fornecedorId: number;

  @IsNumber()
  @ApiProperty()
  motoristaId: number;

  @IsNumber()
  @ApiProperty()
  veiculoId: number;
}

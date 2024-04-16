import { ApiProperty } from '@nestjs/swagger';

export class CreateCnhDto {
  @ApiProperty()
  numeroRegistroCnh: string;

  @ApiProperty()
  categoriaCnh: string;

  @ApiProperty()
  dataVencimentoCnh: Date;

  @ApiProperty()
  motorista_cpf: string;
}

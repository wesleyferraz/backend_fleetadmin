// create-user-admin.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAdminDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;
}

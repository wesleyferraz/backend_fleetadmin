// create-alert.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  eventDate: Date;

  @ApiProperty()
  alertDate: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  sent: boolean;

  @ApiProperty()
  veiculoId: number;
}

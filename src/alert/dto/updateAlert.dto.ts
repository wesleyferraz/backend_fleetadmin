// update-Fornecedor.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateAlertDto } from './createAlert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {}

// update-servico-realizado-preventiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateServicoRealizadoPreventivaDto } from './create-servico-realizado-preventiva.dto';

export class UpdateServicoRealizadoPreventivaDto extends PartialType(
  CreateServicoRealizadoPreventivaDto,
) {}

// update-servico-realizado-corretiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateServicoRealizadoCorretivaDto } from './create-servico-realizado-corretiva.dto';

export class UpdateServicoRealizadoCorretivaDto extends PartialType(
  CreateServicoRealizadoCorretivaDto,
) {}

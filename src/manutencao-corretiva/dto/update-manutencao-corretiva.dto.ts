// update-manutencao-corretiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateManutencaoCorretivaDto } from './create-manutencao-corretiva.dto';

export class UpdateManutencaoCorretivaDto extends PartialType(
  CreateManutencaoCorretivaDto,
) {}

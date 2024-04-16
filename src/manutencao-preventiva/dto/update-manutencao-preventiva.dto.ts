// update-manutencao-preventiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateManutencaoPreventivaDto } from './create-manutencao-preventiva.dto';

export class UpdateManutencaoPreventivaDto extends PartialType(
  CreateManutencaoPreventivaDto,
) {}

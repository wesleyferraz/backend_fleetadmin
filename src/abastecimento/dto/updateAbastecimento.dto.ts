// update-peca.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateAbastecimentoDto } from './createAbastecimento.dto';

export class UpdateAbastecimentoDto extends PartialType(
  CreateAbastecimentoDto,
) {}

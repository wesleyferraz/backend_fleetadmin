// update-servico-manutencao.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateServicoManutencaoDto } from './create-servico-manutencao.dto';

export class UpdateServicoManutencaoDto extends PartialType(
  CreateServicoManutencaoDto,
) {}

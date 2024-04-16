// update-peca-troca-preventiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePecaTrocaPreventivaDto } from './create-peca-troca-preventiva.dto';

export class UpdatePecaTrocaPreventivaDto extends PartialType(
  CreatePecaTrocaPreventivaDto,
) {}

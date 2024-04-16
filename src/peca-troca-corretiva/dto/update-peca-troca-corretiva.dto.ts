// update-peca-troca-corretiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePecaTrocaCorretivaDto } from './create-peca-troca-corretiva.dto';

export class UpdatePecaTrocaCorretivaDto extends PartialType(
  CreatePecaTrocaCorretivaDto,
) {}

// update-peca-troca-corretiva.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreatePecaTrocadaCorretivaDto } from './create-peca-troca-corretiva.dto';

export class UpdatePecaTrocadaCorretivaDto extends PartialType(
  CreatePecaTrocadaCorretivaDto,
) {}

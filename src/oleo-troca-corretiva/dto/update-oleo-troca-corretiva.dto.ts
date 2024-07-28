import { PartialType } from '@nestjs/swagger';
import { CreateOleoTrocadaCorretivaDto } from './create-oleo-troca-corretiva.dto';

export class UpdateOleoTrocadaCorretivaDto extends PartialType(
  CreateOleoTrocadaCorretivaDto,
) {}

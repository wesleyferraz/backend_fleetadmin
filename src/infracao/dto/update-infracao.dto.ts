// update-infracao.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateInfracaoDto } from './create-infracao.dto';

export class UpdateInfracaoDto extends PartialType(CreateInfracaoDto) {}

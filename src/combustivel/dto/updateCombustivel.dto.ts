// update-peca.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCombustivelDto } from './createCombustivel.dto';

export class UpdateCombustivelDto extends PartialType(CreateCombustivelDto) {}

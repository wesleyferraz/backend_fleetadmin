// update-seguradora.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateSeguradoraDto } from './create-seguradora.dto';

export class UpdateSeguradoraDto extends PartialType(CreateSeguradoraDto) {}

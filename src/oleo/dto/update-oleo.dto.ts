// update-peca.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateOleoDto } from './create-oleo.dto';

export class UpdateOleoDto extends PartialType(CreateOleoDto) {}

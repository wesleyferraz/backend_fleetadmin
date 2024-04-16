import { PartialType } from '@nestjs/swagger';
import { CreateCnhDto } from './create-cnh.dto';

export class UpdateCnhDto extends PartialType(CreateCnhDto) {}

// src/faturamento/dto/update-faturamento.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateFaturamentoDto } from './create-faturamento.dto';

export class UpdateFaturamentoDto extends PartialType(CreateFaturamentoDto) {}

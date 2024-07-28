// src/faturamento/faturamento.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaturamentoService } from './faturamento.service';
import { CreateFaturamentoDto } from './dto/create-faturamento.dto';
import { UpdateFaturamentoDto } from './dto/update-faturamento.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Faturamento')
@Controller('faturamento')
export class FaturamentoController {
  constructor(private readonly faturamentoService: FaturamentoService) {}

  @Post()
  create(@Body() createFaturamentoDto: CreateFaturamentoDto) {
    return this.faturamentoService.create(createFaturamentoDto);
  }

  @Get()
  findAll() {
    return this.faturamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faturamentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFaturamentoDto: UpdateFaturamentoDto,
  ) {
    return this.faturamentoService.update(+id, updateFaturamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faturamentoService.remove(+id);
  }
}

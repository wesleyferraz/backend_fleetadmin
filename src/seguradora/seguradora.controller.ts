import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeguradoraService } from './seguradora.service';
import { CreateSeguradoraDto } from './dto/create-seguradora.dto';
import { UpdateSeguradoraDto } from './dto/update-seguradora.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seguradora')
@Controller('seguradora')
export class SeguradoraController {
  constructor(private readonly seguradoraService: SeguradoraService) {}

  @Post()
  create(@Body() createSeguradoraDto: CreateSeguradoraDto) {
    return this.seguradoraService.create(createSeguradoraDto);
  }

  @Get()
  findAll() {
    return this.seguradoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seguradoraService.findOne(+id);
  }

  @Get(':cnpj')
  findCNPJ(@Param('cnpj') cnpj: string) {
    return `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${+cnpj}`;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSeguradoraDto: UpdateSeguradoraDto,
  ) {
    return this.seguradoraService.update(+id, updateSeguradoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seguradoraService.remove(+id);
  }
}

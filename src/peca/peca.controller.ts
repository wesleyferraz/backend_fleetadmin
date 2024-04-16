import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PecaService } from './peca.service';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Peça')
@Controller('peca')
export class PecaController {
  constructor(private readonly pecaService: PecaService) {}

  @Post()
  create(@Body() createPecaDto: CreatePecaDto) {
    return this.pecaService.create(createPecaDto);
  }

  @Get()
  findAll() {
    return this.pecaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pecaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePecaDto: UpdatePecaDto) {
    return this.pecaService.update(+id, updatePecaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pecaService.remove(+id);
  }
}

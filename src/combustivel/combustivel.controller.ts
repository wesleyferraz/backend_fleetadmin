import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCombustivelDto } from './dto/createCombustivel.dto';
import { UpdateCombustivelDto } from './dto/updateCombustivel.dto';
import { ApiTags } from '@nestjs/swagger';
import { CombustivelService } from './combustivel.service';

@ApiTags('Combustivel')
@Controller('combustivel')
export class CombustivelController {
  constructor(private readonly combustivelService: CombustivelService) {}

  @Post()
  create(@Body() createCombustivelDto: CreateCombustivelDto) {
    console.log(
      'Valor recebido no backend:',
      createCombustivelDto.valor_unitario,
    );
    return this.combustivelService.create(createCombustivelDto);
  }

  @Get()
  findAll() {
    return this.combustivelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combustivelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCombustivelDto: UpdateCombustivelDto,
  ) {
    return this.combustivelService.update(+id, updateCombustivelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combustivelService.remove(+id);
  }
}

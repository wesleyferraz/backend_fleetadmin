import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InfracaoService } from './infracao.service';
import { CreateInfracaoDto } from './dto/create-infracao.dto';
import { UpdateInfracaoDto } from './dto/update-infracao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Infração')
@Controller('infracao')
export class InfracaoController {
  constructor(private readonly infracaoService: InfracaoService) {}

  @Post()
  create(@Body() createInfracaoDto: CreateInfracaoDto) {
    return this.infracaoService.create(createInfracaoDto);
  }

  @Get()
  findAll() {
    return this.infracaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infracaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInfracaoDto: UpdateInfracaoDto,
  ) {
    return this.infracaoService.update(+id, updateInfracaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infracaoService.remove(+id);
  }
}

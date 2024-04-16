import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManutencaoCorretivaService } from './manutencao-corretiva.service';
import { CreateManutencaoCorretivaDto } from './dto/create-manutencao-corretiva.dto';
import { UpdateManutencaoCorretivaDto } from './dto/update-manutencao-corretiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manutenção Corretiva')
@Controller('manutencao-corretiva')
export class ManutencaoCorretivaController {
  constructor(
    private readonly manutencaoCorretivaService: ManutencaoCorretivaService,
  ) {}

  @Post()
  create(@Body() createManutencaoCorretivaDto: CreateManutencaoCorretivaDto) {
    return this.manutencaoCorretivaService.create(createManutencaoCorretivaDto);
  }

  @Get()
  findAll() {
    return this.manutencaoCorretivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manutencaoCorretivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManutencaoCorretivaDto: UpdateManutencaoCorretivaDto,
  ) {
    return this.manutencaoCorretivaService.update(
      +id,
      updateManutencaoCorretivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manutencaoCorretivaService.remove(+id);
  }
}

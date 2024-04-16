import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManutencaoPreventivaService } from './manutencao-preventiva.service';
import { CreateManutencaoPreventivaDto } from './dto/create-manutencao-preventiva.dto';
import { UpdateManutencaoPreventivaDto } from './dto/update-manutencao-preventiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manutenção Preventiva')
@Controller('manutencao-preventiva')
export class ManutencaoPreventivaController {
  constructor(
    private readonly manutencaoPreventivaService: ManutencaoPreventivaService,
  ) {}

  @Post()
  create(@Body() createManutencaoPreventivaDto: CreateManutencaoPreventivaDto) {
    return this.manutencaoPreventivaService.create(
      createManutencaoPreventivaDto,
    );
  }

  @Get()
  findAll() {
    return this.manutencaoPreventivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manutencaoPreventivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManutencaoPreventivaDto: UpdateManutencaoPreventivaDto,
  ) {
    return this.manutencaoPreventivaService.update(
      +id,
      updateManutencaoPreventivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manutencaoPreventivaService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicoManutencaoService } from './servico-manutencao.service';
import { CreateServicoManutencaoDto } from './dto/create-servico-manutencao.dto';
import { UpdateServicoManutencaoDto } from './dto/update-servico-manutencao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Serviço Manutenção')
@Controller('servico-manutencao')
export class ServicoManutencaoController {
  constructor(
    private readonly servicoManutencaoService: ServicoManutencaoService,
  ) {}

  @Post()
  create(@Body() createServicoManutencaoDto: CreateServicoManutencaoDto) {
    return this.servicoManutencaoService.create(createServicoManutencaoDto);
  }

  @Get()
  findAll() {
    return this.servicoManutencaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicoManutencaoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServicoManutencaoDto: UpdateServicoManutencaoDto,
  ) {
    return this.servicoManutencaoService.update(
      +id,
      updateServicoManutencaoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicoManutencaoService.remove(+id);
  }
}

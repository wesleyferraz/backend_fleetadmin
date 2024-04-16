import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicoRealizadoPreventivaService } from './servico-realizado-preventiva.service';
import { CreateServicoRealizadoPreventivaDto } from './dto/create-servico-realizado-preventiva.dto';
import { UpdateServicoRealizadoPreventivaDto } from './dto/update-servico-realizado-preventiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Serviço Realizado Preventiva')
@Controller('servico-realizado-preventiva')
export class ServicoRealizadoPreventivaController {
  constructor(
    private readonly servicoRealizadoPreventivaService: ServicoRealizadoPreventivaService,
  ) {}

  @Post()
  create(
    @Body()
    createServicoRealizadoPreventivaDto: CreateServicoRealizadoPreventivaDto,
  ) {
    return this.servicoRealizadoPreventivaService.create(
      createServicoRealizadoPreventivaDto,
    );
  }

  @Get()
  findAll() {
    return this.servicoRealizadoPreventivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicoRealizadoPreventivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateServicoRealizadoPreventivaDto: UpdateServicoRealizadoPreventivaDto,
  ) {
    return this.servicoRealizadoPreventivaService.update(
      +id,
      updateServicoRealizadoPreventivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicoRealizadoPreventivaService.remove(+id);
  }
}

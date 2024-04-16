import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicoRealizadoCorretivaService } from './servico-realizado-corretiva.service';
import { CreateServicoRealizadoCorretivaDto } from './dto/create-servico-realizado-corretiva.dto';
import { UpdateServicoRealizadoCorretivaDto } from './dto/update-servico-realizado-corretiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Serviço Realizado Corretiva')
@Controller('servico-realizado-corretiva')
export class ServicoRealizadoCorretivaController {
  constructor(
    private readonly servicoRealizadoCorretivaService: ServicoRealizadoCorretivaService,
  ) {}

  @Post()
  create(
    @Body()
    createServicoRealizadoCorretivaDto: CreateServicoRealizadoCorretivaDto,
  ) {
    return this.servicoRealizadoCorretivaService.create(
      createServicoRealizadoCorretivaDto,
    );
  }

  @Get()
  findAll() {
    return this.servicoRealizadoCorretivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicoRealizadoCorretivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateServicoRealizadoCorretivaDto: UpdateServicoRealizadoCorretivaDto,
  ) {
    return this.servicoRealizadoCorretivaService.update(
      +id,
      updateServicoRealizadoCorretivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicoRealizadoCorretivaService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PneuService } from './pneu.service';
import { CreatePneuDto } from './dto/create-pneu.dto';
import { UpdatePneuDto } from './dto/update-pneu.dto';
import { ApiTags } from '@nestjs/swagger';
import { Pneu } from './entities/pneu.entity';
import { GetAllByVeiculoDto } from './dto/getAllByVeiculo.dto';
import { SetPneuDto } from './dto/setGaragem.dto';

@ApiTags('Pneu')
@Controller('pneus')
export class PneuController {
  constructor(private readonly pneuService: PneuService) {}

  @Post()
  create(@Body() CreatePneuDto: CreatePneuDto) {
    return this.pneuService.create(CreatePneuDto);
  }

  @Get()
  findAll() {
    return this.pneuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pneuService.findOne(+id);
  }

  @Get('veiculo/:veiculoId')
  async getPneusByVeiculoId(
    @Param('veiculoId') veiculoId: number,
  ): Promise<CreatePneuDto[]> {
    return this.pneuService.findAllByVeiculoId(veiculoId);
  }

  @Patch('set-veiculo-to-zero')
  async setVeiculoIdToZero(@Body() pneu: SetPneuDto) {
    return this.pneuService.updateVeiculoIdToZero(pneu.veiculoId, pneu.posicao);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePecaDto: UpdatePneuDto) {
    return this.pneuService.update(+id, updatePecaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pneuService.remove(+id);
  }
}

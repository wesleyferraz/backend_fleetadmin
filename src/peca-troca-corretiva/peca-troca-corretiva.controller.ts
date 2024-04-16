import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PecaTrocaCorretivaService } from './peca-troca-corretiva.service';
import { CreatePecaTrocaCorretivaDto } from './dto/create-peca-troca-corretiva.dto';
import { UpdatePecaTrocaCorretivaDto } from './dto/update-peca-troca-corretiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Peça Troca Corretiva')
@Controller('peca-troca-corretiva')
export class PecaTrocaCorretivaController {
  constructor(
    private readonly pecaTrocaCorretivaService: PecaTrocaCorretivaService,
  ) {}

  @Post()
  create(@Body() createPecaTrocaCorretivaDto: CreatePecaTrocaCorretivaDto) {
    return this.pecaTrocaCorretivaService.create(createPecaTrocaCorretivaDto);
  }

  @Get()
  findAll() {
    return this.pecaTrocaCorretivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pecaTrocaCorretivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePecaTrocaCorretivaDto: UpdatePecaTrocaCorretivaDto,
  ) {
    return this.pecaTrocaCorretivaService.update(
      +id,
      updatePecaTrocaCorretivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pecaTrocaCorretivaService.remove(+id);
  }
}

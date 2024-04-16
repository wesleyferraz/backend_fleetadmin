import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PecaTrocaPreventivaService } from './peca-troca-preventiva.service';
import { CreatePecaTrocaPreventivaDto } from './dto/create-peca-troca-preventiva.dto';
import { UpdatePecaTrocaPreventivaDto } from './dto/update-peca-troca-preventiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Peça Troca Preventiva')
@Controller('peca-troca-preventiva')
export class PecaTrocaPreventivaController {
  constructor(
    private readonly pecaTrocaPreventivaService: PecaTrocaPreventivaService,
  ) {}

  @Post()
  create(@Body() createPecaTrocaPreventivaDto: CreatePecaTrocaPreventivaDto) {
    return this.pecaTrocaPreventivaService.create(createPecaTrocaPreventivaDto);
  }

  @Get()
  findAll() {
    return this.pecaTrocaPreventivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pecaTrocaPreventivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePecaTrocaPreventivaDto: UpdatePecaTrocaPreventivaDto,
  ) {
    return this.pecaTrocaPreventivaService.update(
      +id,
      updatePecaTrocaPreventivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pecaTrocaPreventivaService.remove(+id);
  }
}

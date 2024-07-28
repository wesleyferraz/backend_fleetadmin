import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OleoTrocaCorretivaService } from './oleo-troca-corretiva.service';
import { CreateOleoTrocadaCorretivaDto } from './dto/create-oleo-troca-corretiva.dto';
import { UpdateOleoTrocadaCorretivaDto } from './dto/update-oleo-troca-corretiva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Óleo Troca Corretiva')
@Controller('oleo-troca-corretiva')
export class OleoTrocaCorretivaController {
  constructor(
    private readonly oleoTrocaCorretivaService: OleoTrocaCorretivaService,
  ) {}

  @Post()
  create(@Body() createOleoTrocaCorretivaDto: CreateOleoTrocadaCorretivaDto) {
    return this.oleoTrocaCorretivaService.create(createOleoTrocaCorretivaDto);
  }

  @Get()
  findAll() {
    return this.oleoTrocaCorretivaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oleoTrocaCorretivaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOleoTrocaCorretivaDto: UpdateOleoTrocadaCorretivaDto,
  ) {
    return this.oleoTrocaCorretivaService.update(
      +id,
      updateOleoTrocaCorretivaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oleoTrocaCorretivaService.remove(+id);
  }
}

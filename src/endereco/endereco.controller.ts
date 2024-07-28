import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Endereço')
@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto) {
    return this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  findAll() {
    return this.enderecoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ) {
    return this.enderecoService.update(id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(+id);
  }

  @Get('cep/:cep')
  @ApiOperation({ summary: 'Consultar Endereço por CEP' })
  @ApiParam({ name: 'cep', type: 'number', description: 'CEP do endereço' })
  consultarCEP(@Param('cep') cep: number) {
    return this.enderecoService.consultarCEP(+cep);
  }
}

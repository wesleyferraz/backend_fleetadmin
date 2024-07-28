import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePostoDto } from './dto/create-posto.dto';
import { PostoService } from './posto.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Postos')
@Controller('Postos')
export class PostoController {
  constructor(private readonly postoService: PostoService) {}

  @Post()
  create(@Body() createPostoDto: CreatePostoDto) {
    return this.postoService.create(createPostoDto);
  }

  @Get()
  findAll() {
    return this.postoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createPostoDto: CreatePostoDto) {
    return this.postoService.update(+id, createPostoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postoService.remove(+id);
  }
}

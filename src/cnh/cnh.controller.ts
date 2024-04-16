import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CnhService } from './cnh.service';
import { CreateCnhDto } from './dto/create-cnh.dto';
import { UpdateCnhDto } from './dto/update-cnh.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CNH')
@Controller('cnh')
export class CnhController {
  constructor(private readonly cnhService: CnhService) {}

  @Post()
  create(@Body() createCnhDto: CreateCnhDto) {
    return this.cnhService.create(createCnhDto);
  }

  @Get()
  findAll() {
    return this.cnhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cnhService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCnhDto: UpdateCnhDto) {
    return this.cnhService.update(+id, updateCnhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cnhService.remove(+id);
  }
}

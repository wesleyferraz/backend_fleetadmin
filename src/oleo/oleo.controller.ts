import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OleoService } from './oleo.service';
import { CreateOleoDto } from './dto/create-oleo.dto';
import { UpdateOleoDto } from './dto/update-oleo.dto';
import { Oleo } from './entities/oleo.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Oleo')
@Controller('oleo')
export class OleoController {
  constructor(private readonly oleoService: OleoService) {}

  @Post()
  async create(@Body() createOleoDto: CreateOleoDto): Promise<Oleo> {
    return this.oleoService.create(createOleoDto);
  }

  @Get()
  async findAll(): Promise<Oleo[]> {
    return this.oleoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Oleo> {
    return this.oleoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOleoDto: UpdateOleoDto,
  ): Promise<Oleo> {
    return this.oleoService.update(+id, updateOleoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.oleoService.remove(+id);
  }
}

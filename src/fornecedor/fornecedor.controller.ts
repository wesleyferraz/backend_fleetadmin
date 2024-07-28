import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Fornecedor')
@Controller('Fornecedor')
export class FornecedorController {
  constructor(private readonly FornecedorService: FornecedorService) {}

  @Post()
  create(@Body() createFornecedorDto: CreateFornecedorDto) {
    return this.FornecedorService.create(createFornecedorDto);
  }

  @Get()
  findAll() {
    return this.FornecedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.FornecedorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFornecedorDto: UpdateFornecedorDto,
  ) {
    return this.FornecedorService.update(+id, updateFornecedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.FornecedorService.remove(+id);
  }
}

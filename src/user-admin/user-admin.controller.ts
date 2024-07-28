import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersAdminService } from './user-admin.service';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Admin')
@Controller('user-admin')
export class UserAdminController {
  constructor(private readonly userAdminService: UsersAdminService) {}

  @Post()
  create(@Body() createUserAdminDto: CreateUserAdminDto) {
    return this.userAdminService.create(
      createUserAdminDto.nome,
      createUserAdminDto.email,
      createUserAdminDto.senha,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAdminService.findOne(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAdmin } from './entities/user-admin.entity';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserAdmin)
    private readonly userAdminRepository: Repository<UserAdmin>,
  ) {}

  async create(createUserAdminDto: CreateUserAdminDto): Promise<UserAdmin> {
    const newUserAdmin = this.userAdminRepository.create(createUserAdminDto);
    return await this.userAdminRepository.save(newUserAdmin);
  }

  async findAll(): Promise<UserAdmin[]> {
    return await this.userAdminRepository.find();
  }

  async findOne(id: number): Promise<UserAdmin> {
    const userAdmin = await this.userAdminRepository.findOneBy({ id });
    if (!userAdmin) {
      throw new NotFoundException(`UserAdmin with ID ${id} not found`);
    }
    return userAdmin;
  }

  async update(
    id: number,
    updateUserAdminDto: UpdateUserAdminDto,
  ): Promise<UserAdmin> {
    const userAdmin = await this.findOne(id);
    this.userAdminRepository.merge(userAdmin, updateUserAdminDto);
    return await this.userAdminRepository.save(userAdmin);
  }

  async remove(id: number): Promise<void> {
    const userAdmin = await this.findOne(id);
    await this.userAdminRepository.remove(userAdmin);
  }
}

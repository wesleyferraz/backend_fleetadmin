import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersAdmin } from './entities/user-admin.entity';

@Injectable()
export class UsersAdminService {
  constructor(
    @InjectRepository(UsersAdmin)
    private usersRepository: Repository<UsersAdmin>,
  ) {}

  async findOne(username: string): Promise<UsersAdmin | undefined> {
    return this.usersRepository.findOne({ where: { nome: username } });
  }

  async create(
    nome: string,
    email: string,
    senha: string,
  ): Promise<UsersAdmin> {
    const user = this.usersRepository.create({ nome, email, senha });
    return this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<UsersAdmin | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CNH } from './entities/cnh.entity';
import { CreateCnhDto } from './dto/create-cnh.dto';
import { UpdateCnhDto } from './dto/update-cnh.dto';

@Injectable()
export class CnhService {
  constructor(
    @InjectRepository(CNH)
    private readonly cnhRepository: Repository<CNH>,
  ) {}

  async create(createCnhDto: CreateCnhDto): Promise<CNH> {
    const newCnh = this.cnhRepository.create(createCnhDto);
    return await this.cnhRepository.save(newCnh);
  }

  async findAll(): Promise<CNH[]> {
    return await this.cnhRepository.find();
  }

  async findOne(id: number): Promise<CNH> {
    const cnh = await this.cnhRepository.findOneBy({ id });
    if (!cnh) {
      throw new NotFoundException(`CNH with ID ${id} not found`);
    }
    return cnh;
  }

  async update(id: number, updateCnhDto: UpdateCnhDto): Promise<CNH> {
    const cnh = await this.findOne(id);
    this.cnhRepository.merge(cnh, updateCnhDto);
    return await this.cnhRepository.save(cnh);
  }

  async remove(id: number): Promise<void> {
    const cnh = await this.findOne(id);
    await this.cnhRepository.remove(cnh);
  }
}

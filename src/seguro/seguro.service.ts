import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguro } from './entities/seguro.entity';
import { CreateSeguroDto } from './dto/create-seguro.dto';
import { UpdateSeguroDto } from './dto/update-seguro.dto';

@Injectable()
export class SeguroService {
  constructor(
    @InjectRepository(Seguro)
    private readonly seguroRepository: Repository<Seguro>,
  ) {}

  async create(createSeguroDto: CreateSeguroDto): Promise<Seguro> {
    const newSeguro = this.seguroRepository.create(createSeguroDto);
    return await this.seguroRepository.save(newSeguro);
  }

  async findAll(): Promise<Seguro[]> {
    return await this.seguroRepository.find();
  }

  async findOne(id: number): Promise<Seguro> {
    const seguro = await this.seguroRepository.findOneBy({ id });
    if (!seguro) {
      throw new NotFoundException(`Seguro with ID ${id} not found`);
    }
    return seguro;
  }

  async update(id: number, updateSeguroDto: UpdateSeguroDto): Promise<Seguro> {
    const seguro = await this.findOne(id);
    this.seguroRepository.merge(seguro, updateSeguroDto);
    return await this.seguroRepository.save(seguro);
  }

  async remove(id: number): Promise<void> {
    const seguro = await this.findOne(id);
    await this.seguroRepository.remove(seguro);
  }
}

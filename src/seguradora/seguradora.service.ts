import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguradora } from './entities/seguradora.entity';
import { CreateSeguradoraDto } from './dto/create-seguradora.dto';
import { UpdateSeguradoraDto } from './dto/update-seguradora.dto';

@Injectable()
export class SeguradoraService {
  constructor(
    @InjectRepository(Seguradora)
    private readonly seguradoraRepository: Repository<Seguradora>,
  ) {}

  async create(createSeguradoraDto: CreateSeguradoraDto): Promise<Seguradora> {
    const newSeguradora = this.seguradoraRepository.create(createSeguradoraDto);
    return await this.seguradoraRepository.save(newSeguradora);
  }

  async findAll(): Promise<Seguradora[]> {
    return await this.seguradoraRepository.find();
  }

  async findOne(id: number): Promise<Seguradora> {
    const seguradora = await this.seguradoraRepository.findOneBy({ id });
    if (!seguradora) {
      throw new NotFoundException(`Seguradora with ID ${id} not found`);
    }
    return seguradora;
  }

  async update(
    id: number,
    updateSeguradoraDto: UpdateSeguradoraDto,
  ): Promise<Seguradora> {
    const seguradora = await this.findOne(id);
    this.seguradoraRepository.merge(seguradora, updateSeguradoraDto);
    return await this.seguradoraRepository.save(seguradora);
  }

  async remove(id: number): Promise<void> {
    const seguradora = await this.findOne(id);
    await this.seguradoraRepository.remove(seguradora);
  }
}

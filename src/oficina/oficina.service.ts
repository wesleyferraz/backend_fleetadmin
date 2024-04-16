import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oficina } from './entities/oficina.entity';
import { CreateOficinaDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';

@Injectable()
export class OficinaService {
  constructor(
    @InjectRepository(Oficina)
    private readonly oficinaRepository: Repository<Oficina>,
  ) {}

  async create(createOficinaDto: CreateOficinaDto): Promise<Oficina> {
    const newOficina = this.oficinaRepository.create(createOficinaDto);
    return await this.oficinaRepository.save(newOficina);
  }

  async findAll(): Promise<Oficina[]> {
    return await this.oficinaRepository.find();
  }

  async findOne(id: number): Promise<Oficina> {
    const oficina = await this.oficinaRepository.findOneBy({ id });
    if (!oficina) {
      throw new NotFoundException(`Oficina with ID ${id} not found`);
    }
    return oficina;
  }

  async update(
    id: number,
    updateOficinaDto: UpdateOficinaDto,
  ): Promise<Oficina> {
    const oficina = await this.findOne(id);
    this.oficinaRepository.merge(oficina, updateOficinaDto);
    return await this.oficinaRepository.save(oficina);
  }

  async remove(id: number): Promise<void> {
    const oficina = await this.findOne(id);
    await this.oficinaRepository.remove(oficina);
  }
}

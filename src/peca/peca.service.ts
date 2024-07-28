import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pecas } from './entities/peca.entity';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';

@Injectable()
export class PecaService {
  constructor(
    @InjectRepository(Pecas)
    private readonly pecaRepository: Repository<Pecas>,
  ) {}

  async create(createPecaDto: CreatePecaDto): Promise<Pecas> {
    const newPeca = this.pecaRepository.create(createPecaDto);
    return await this.pecaRepository.save(newPeca);
  }

  async findAll(): Promise<Pecas[]> {
    return await this.pecaRepository.find();
  }

  async findOne(id: number): Promise<Pecas> {
    const peca = await this.pecaRepository.findOneBy({ id });
    if (!peca) {
      throw new NotFoundException(`Peça with ID ${id} not found`);
    }
    return peca;
  }

  async update(id: number, updatePecaDto: UpdatePecaDto): Promise<Pecas> {
    const peca = await this.findOne(id);
    this.pecaRepository.merge(peca, updatePecaDto);
    return await this.pecaRepository.save(peca);
  }

  async remove(id: number): Promise<void> {
    const peca = await this.findOne(id);
    await this.pecaRepository.remove(peca);
  }
}

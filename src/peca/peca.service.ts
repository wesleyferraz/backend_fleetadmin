import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Peca } from './entities/peca.entity';
import { CreatePecaDto } from './dto/create-peca.dto';
import { UpdatePecaDto } from './dto/update-peca.dto';

@Injectable()
export class PecaService {
  constructor(
    @InjectRepository(Peca)
    private readonly pecaRepository: Repository<Peca>,
  ) {}

  async create(createPecaDto: CreatePecaDto): Promise<Peca> {
    const newPeca = this.pecaRepository.create(createPecaDto);
    return await this.pecaRepository.save(newPeca);
  }

  async findAll(): Promise<Peca[]> {
    return await this.pecaRepository.find();
  }

  async findOne(id: number): Promise<Peca> {
    const peca = await this.pecaRepository.findOneBy({ id });
    if (!peca) {
      throw new NotFoundException(`Peça with ID ${id} not found`);
    }
    return peca;
  }

  async update(id: number, updatePecaDto: UpdatePecaDto): Promise<Peca> {
    const peca = await this.findOne(id);
    this.pecaRepository.merge(peca, updatePecaDto);
    return await this.pecaRepository.save(peca);
  }

  async remove(id: number): Promise<void> {
    const peca = await this.findOne(id);
    await this.pecaRepository.remove(peca);
  }
}

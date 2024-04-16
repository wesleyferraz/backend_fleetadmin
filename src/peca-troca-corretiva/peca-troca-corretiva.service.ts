import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PecaTrocaCorretiva } from './entities/peca-troca-corretiva.entity';
import { CreatePecaTrocaCorretivaDto } from './dto/create-peca-troca-corretiva.dto';
import { UpdatePecaTrocaCorretivaDto } from './dto/update-peca-troca-corretiva.dto';

@Injectable()
export class PecaTrocaCorretivaService {
  constructor(
    @InjectRepository(PecaTrocaCorretiva)
    private readonly pecaTrocaCorretivaRepository: Repository<PecaTrocaCorretiva>,
  ) {}

  async create(
    createPecaTrocaCorretivaDto: CreatePecaTrocaCorretivaDto,
  ): Promise<PecaTrocaCorretiva> {
    const newPecaTrocaCorretiva = this.pecaTrocaCorretivaRepository.create(
      createPecaTrocaCorretivaDto,
    );
    return await this.pecaTrocaCorretivaRepository.save(newPecaTrocaCorretiva);
  }

  async findAll(): Promise<PecaTrocaCorretiva[]> {
    return await this.pecaTrocaCorretivaRepository.find();
  }

  async findOne(id: number): Promise<PecaTrocaCorretiva> {
    const pecaTrocaCorretiva =
      await this.pecaTrocaCorretivaRepository.findOneBy({ id });
    if (!pecaTrocaCorretiva) {
      throw new NotFoundException(
        `Peça Troca Corretiva with ID ${id} not found`,
      );
    }
    return pecaTrocaCorretiva;
  }

  async update(
    id: number,
    updatePecaTrocaCorretivaDto: UpdatePecaTrocaCorretivaDto,
  ): Promise<PecaTrocaCorretiva> {
    const pecaTrocaCorretiva = await this.findOne(id);
    this.pecaTrocaCorretivaRepository.merge(
      pecaTrocaCorretiva,
      updatePecaTrocaCorretivaDto,
    );
    return await this.pecaTrocaCorretivaRepository.save(pecaTrocaCorretiva);
  }

  async remove(id: number): Promise<void> {
    const pecaTrocaCorretiva = await this.findOne(id);
    await this.pecaTrocaCorretivaRepository.remove(pecaTrocaCorretiva);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PecaTrocaPreventiva } from './entities/peca-troca-preventiva.entity';
import { CreatePecaTrocaPreventivaDto } from './dto/create-peca-troca-preventiva.dto';
import { UpdatePecaTrocaPreventivaDto } from './dto/update-peca-troca-preventiva.dto';

@Injectable()
export class PecaTrocaPreventivaService {
  constructor(
    @InjectRepository(PecaTrocaPreventiva)
    private readonly pecaTrocaPreventivaRepository: Repository<PecaTrocaPreventiva>,
  ) {}

  async create(
    createPecaTrocaPreventivaDto: CreatePecaTrocaPreventivaDto,
  ): Promise<PecaTrocaPreventiva> {
    const newPecaTrocaPreventiva = this.pecaTrocaPreventivaRepository.create(
      createPecaTrocaPreventivaDto,
    );
    return await this.pecaTrocaPreventivaRepository.save(
      newPecaTrocaPreventiva,
    );
  }

  async findAll(): Promise<PecaTrocaPreventiva[]> {
    return await this.pecaTrocaPreventivaRepository.find();
  }

  async findOne(id: number): Promise<PecaTrocaPreventiva> {
    const pecaTrocaPreventiva =
      await this.pecaTrocaPreventivaRepository.findOneBy({ id });
    if (!pecaTrocaPreventiva) {
      throw new NotFoundException(
        `Peça Troca Preventiva with ID ${id} not found`,
      );
    }
    return pecaTrocaPreventiva;
  }

  async update(
    id: number,
    updatePecaTrocaPreventivaDto: UpdatePecaTrocaPreventivaDto,
  ): Promise<PecaTrocaPreventiva> {
    const pecaTrocaPreventiva = await this.findOne(id);
    this.pecaTrocaPreventivaRepository.merge(
      pecaTrocaPreventiva,
      updatePecaTrocaPreventivaDto,
    );
    return await this.pecaTrocaPreventivaRepository.save(pecaTrocaPreventiva);
  }

  async remove(id: number): Promise<void> {
    const pecaTrocaPreventiva = await this.findOne(id);
    await this.pecaTrocaPreventivaRepository.remove(pecaTrocaPreventiva);
  }
}

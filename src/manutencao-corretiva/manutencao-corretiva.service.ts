import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManutencaoCorretiva } from './entities/manutencao-corretiva.entity';
import { CreateManutencaoCorretivaDto } from './dto/create-manutencao-corretiva.dto';
import { UpdateManutencaoCorretivaDto } from './dto/update-manutencao-corretiva.dto';

@Injectable()
export class ManutencaoCorretivaService {
  constructor(
    @InjectRepository(ManutencaoCorretiva)
    private readonly manutencaoCorretivaRepository: Repository<ManutencaoCorretiva>,
  ) {}

  async create(
    createManutencaoCorretivaDto: CreateManutencaoCorretivaDto,
  ): Promise<ManutencaoCorretiva> {
    const newManutencaoCorretiva = this.manutencaoCorretivaRepository.create(
      createManutencaoCorretivaDto,
    );
    return await this.manutencaoCorretivaRepository.save(
      newManutencaoCorretiva,
    );
  }

  async findAll(): Promise<ManutencaoCorretiva[]> {
    return await this.manutencaoCorretivaRepository.find();
  }

  async findOne(id: number): Promise<ManutencaoCorretiva> {
    const manutencaoCorretiva =
      await this.manutencaoCorretivaRepository.findOneBy({ id });
    if (!manutencaoCorretiva) {
      throw new NotFoundException(
        `Manutencao Corretiva with ID ${id} not found`,
      );
    }
    return manutencaoCorretiva;
  }

  async update(
    id: number,
    updateManutencaoCorretivaDto: UpdateManutencaoCorretivaDto,
  ): Promise<ManutencaoCorretiva> {
    const manutencaoCorretiva = await this.findOne(id);
    this.manutencaoCorretivaRepository.merge(
      manutencaoCorretiva,
      updateManutencaoCorretivaDto,
    );
    return await this.manutencaoCorretivaRepository.save(manutencaoCorretiva);
  }

  async remove(id: number): Promise<void> {
    const manutencaoCorretiva = await this.findOne(id);
    await this.manutencaoCorretivaRepository.remove(manutencaoCorretiva);
  }
}

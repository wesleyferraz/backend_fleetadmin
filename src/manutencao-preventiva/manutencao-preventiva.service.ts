import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManutencaoPreventiva } from './entities/manutencao-preventiva.entity';
import { CreateManutencaoPreventivaDto } from './dto/create-manutencao-preventiva.dto';
import { UpdateManutencaoPreventivaDto } from './dto/update-manutencao-preventiva.dto';

@Injectable()
export class ManutencaoPreventivaService {
  constructor(
    @InjectRepository(ManutencaoPreventiva)
    private readonly manutencaoPreventivaRepository: Repository<ManutencaoPreventiva>,
  ) {}

  async create(
    createManutencaoPreventivaDto: CreateManutencaoPreventivaDto,
  ): Promise<ManutencaoPreventiva> {
    const newManutencaoPreventiva = this.manutencaoPreventivaRepository.create(
      createManutencaoPreventivaDto,
    );
    return await this.manutencaoPreventivaRepository.save(
      newManutencaoPreventiva,
    );
  }

  async findAll(): Promise<ManutencaoPreventiva[]> {
    return await this.manutencaoPreventivaRepository.find();
  }

  async findOne(id: number): Promise<ManutencaoPreventiva> {
    const manutencaoPreventiva =
      await this.manutencaoPreventivaRepository.findOneBy({ id });
    if (!manutencaoPreventiva) {
      throw new NotFoundException(
        `Manutencao Preventiva with ID ${id} not found`,
      );
    }
    return manutencaoPreventiva;
  }

  async update(
    id: number,
    updateManutencaoPreventivaDto: UpdateManutencaoPreventivaDto,
  ): Promise<ManutencaoPreventiva> {
    const manutencaoPreventiva = await this.findOne(id);
    this.manutencaoPreventivaRepository.merge(
      manutencaoPreventiva,
      updateManutencaoPreventivaDto,
    );
    return await this.manutencaoPreventivaRepository.save(manutencaoPreventiva);
  }

  async remove(id: number): Promise<void> {
    const manutencaoPreventiva = await this.findOne(id);
    await this.manutencaoPreventivaRepository.remove(manutencaoPreventiva);
  }
}

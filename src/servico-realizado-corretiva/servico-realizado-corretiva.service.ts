import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicoRealizadoCorretiva } from './entities/servico-realizado-corretiva.entity';
import { CreateServicoRealizadoCorretivaDto } from './dto/create-servico-realizado-corretiva.dto';
import { UpdateServicoRealizadoCorretivaDto } from './dto/update-servico-realizado-corretiva.dto';

@Injectable()
export class ServicoRealizadoCorretivaService {
  constructor(
    @InjectRepository(ServicoRealizadoCorretiva)
    private readonly servicoRealizadoCorretivaRepository: Repository<ServicoRealizadoCorretiva>,
  ) {}

  async create(
    createServicoRealizadoCorretivaDto: CreateServicoRealizadoCorretivaDto,
  ): Promise<ServicoRealizadoCorretiva> {
    const newServicoRealizadoCorretiva =
      this.servicoRealizadoCorretivaRepository.create(
        createServicoRealizadoCorretivaDto,
      );
    return await this.servicoRealizadoCorretivaRepository.save(
      newServicoRealizadoCorretiva,
    );
  }

  async findAll(): Promise<ServicoRealizadoCorretiva[]> {
    return await this.servicoRealizadoCorretivaRepository.find();
  }

  async findOne(id: number): Promise<ServicoRealizadoCorretiva> {
    const servicoRealizadoCorretiva =
      await this.servicoRealizadoCorretivaRepository.findOneBy({ id });
    if (!servicoRealizadoCorretiva) {
      throw new NotFoundException(
        `Serviço Realizado Corretiva with ID ${id} not found`,
      );
    }
    return servicoRealizadoCorretiva;
  }

  async update(
    id: number,
    updateServicoRealizadoCorretivaDto: UpdateServicoRealizadoCorretivaDto,
  ): Promise<ServicoRealizadoCorretiva> {
    const servicoRealizadoCorretiva = await this.findOne(id);
    this.servicoRealizadoCorretivaRepository.merge(
      servicoRealizadoCorretiva,
      updateServicoRealizadoCorretivaDto,
    );
    return await this.servicoRealizadoCorretivaRepository.save(
      servicoRealizadoCorretiva,
    );
  }

  async remove(id: number): Promise<void> {
    const servicoRealizadoCorretiva = await this.findOne(id);
    await this.servicoRealizadoCorretivaRepository.remove(
      servicoRealizadoCorretiva,
    );
  }
}

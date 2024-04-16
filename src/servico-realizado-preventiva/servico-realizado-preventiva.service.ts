import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicoRealizadoPreventiva } from './entities/servico-realizado-preventiva.entity';
import { CreateServicoRealizadoPreventivaDto } from './dto/create-servico-realizado-preventiva.dto';
import { UpdateServicoRealizadoPreventivaDto } from './dto/update-servico-realizado-preventiva.dto';

@Injectable()
export class ServicoRealizadoPreventivaService {
  constructor(
    @InjectRepository(ServicoRealizadoPreventiva)
    private readonly servicoRealizadoPreventivaRepository: Repository<ServicoRealizadoPreventiva>,
  ) {}

  async create(
    createServicoRealizadoPreventivaDto: CreateServicoRealizadoPreventivaDto,
  ): Promise<ServicoRealizadoPreventiva> {
    const newServicoRealizadoPreventiva =
      this.servicoRealizadoPreventivaRepository.create(
        createServicoRealizadoPreventivaDto,
      );
    return await this.servicoRealizadoPreventivaRepository.save(
      newServicoRealizadoPreventiva,
    );
  }

  async findAll(): Promise<ServicoRealizadoPreventiva[]> {
    return await this.servicoRealizadoPreventivaRepository.find();
  }

  async findOne(id: number): Promise<ServicoRealizadoPreventiva> {
    const servicoRealizadoPreventiva =
      await this.servicoRealizadoPreventivaRepository.findOneBy({ id });
    if (!servicoRealizadoPreventiva) {
      throw new NotFoundException(
        `Serviço Realizado Preventiva with ID ${id} not found`,
      );
    }
    return servicoRealizadoPreventiva;
  }

  async update(
    id: number,
    updateServicoRealizadoPreventivaDto: UpdateServicoRealizadoPreventivaDto,
  ): Promise<ServicoRealizadoPreventiva> {
    const servicoRealizadoPreventiva = await this.findOne(id);
    this.servicoRealizadoPreventivaRepository.merge(
      servicoRealizadoPreventiva,
      updateServicoRealizadoPreventivaDto,
    );
    return await this.servicoRealizadoPreventivaRepository.save(
      servicoRealizadoPreventiva,
    );
  }

  async remove(id: number): Promise<void> {
    const servicoRealizadoPreventiva = await this.findOne(id);
    await this.servicoRealizadoPreventivaRepository.remove(
      servicoRealizadoPreventiva,
    );
  }
}

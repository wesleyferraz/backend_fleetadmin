// seguro.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguros } from './entities/seguro.entity';
import { CreateSeguroDto } from './dto/create-seguro.dto';
import { UpdateSeguroDto } from './dto/update-seguro.dto';
import { Seguradoras } from 'src/seguradora/entities/seguradora.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Injectable()
export class SeguroService {
  constructor(
    @InjectRepository(Seguros)
    private readonly seguroRepository: Repository<Seguros>,
    @InjectRepository(Seguradoras)
    private readonly seguradorasRepository: Repository<Seguradoras>,
    @InjectRepository(Veiculos)
    private readonly veiculosRepository: Repository<Veiculos>,
  ) {}

  async create(createSeguroDto: CreateSeguroDto): Promise<Seguros> {
    const seguradora = await this.seguradorasRepository.findOne({
      where: { id: createSeguroDto.seguradoraId },
    });
    if (!seguradora) {
      throw new NotFoundException(
        `Seguradora com ID ${createSeguroDto.seguradoraId} não encontrada`,
      );
    }

    const veiculo = await this.veiculosRepository.findOne({
      where: { id: createSeguroDto.veiculoId },
    });
    if (!veiculo) {
      throw new NotFoundException(
        `Veículo com ID ${createSeguroDto.veiculoId} não encontrado`,
      );
    }

    const newSeguro = this.seguroRepository.create({
      ...createSeguroDto,
      seguradoraId: seguradora,
      veiculoId: veiculo,
    });

    return await this.seguroRepository.save(newSeguro);
  }

  async findAll(): Promise<Seguros[]> {
    return await this.seguroRepository.find({
      relations: ['seguradoraId', 'veiculoId'],
    });
  }

  async findOne(id: number): Promise<Seguros> {
    const seguro = await this.seguroRepository.findOne({
      where: { id },
      relations: ['seguradoraId', 'veiculoId'],
    });
    if (!seguro) {
      throw new NotFoundException(`Seguro com ID ${id} não encontrado`);
    }
    return seguro;
  }

  async update(id: number, updateSeguroDto: UpdateSeguroDto): Promise<Seguros> {
    const seguro = await this.findOne(id);

    if (updateSeguroDto.seguradoraId) {
      const seguradora = await this.seguradorasRepository.findOne({
        where: { id: updateSeguroDto.seguradoraId },
      });
      if (!seguradora) {
        throw new NotFoundException(
          `Seguradora com ID ${updateSeguroDto.seguradoraId} não encontrada`,
        );
      }
      seguro.seguradoraId = seguradora;
    }

    if (updateSeguroDto.veiculoId) {
      const veiculo = await this.veiculosRepository.findOne({
        where: { id: updateSeguroDto.veiculoId },
      });
      if (!veiculo) {
        throw new NotFoundException(
          `Veículo com ID ${updateSeguroDto.veiculoId} não encontrado`,
        );
      }
      seguro.veiculoId = veiculo;
    }

    // Remover seguradoraId e veiculoId do DTO para evitar conflitos de tipo
    const { seguradoraId, veiculoId, ...restUpdateDto } = updateSeguroDto;
    this.seguroRepository.merge(seguro, restUpdateDto);

    return await this.seguroRepository.save(seguro);
  }

  async remove(id: number): Promise<void> {
    const seguro = await this.findOne(id);
    await this.seguroRepository.remove(seguro);
  }
}

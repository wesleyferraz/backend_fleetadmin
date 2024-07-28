import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seguradoras } from './entities/seguradora.entity';
import { CreateSeguradoraDto } from './dto/create-seguradora.dto';
import { UpdateSeguradoraDto } from './dto/update-seguradora.dto';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Injectable()
export class SeguradoraService {
  constructor(
    @InjectRepository(Seguradoras)
    private readonly seguradoraRepository: Repository<Seguradoras>,
    @InjectRepository(Enderecos)
    private readonly enderecosRepository: Repository<Enderecos>,
  ) {}

  async create(createSeguradoraDto: CreateSeguradoraDto): Promise<Seguradoras> {
    const endereco = await this.enderecosRepository.findOne({
      where: { id: createSeguradoraDto.enderecoId },
    });
    if (!endereco) {
      throw new NotFoundException(
        `Endereço com ID ${createSeguradoraDto.enderecoId} não encontrado`,
      );
    }

    const newSeguradora = this.seguradoraRepository.create({
      ...createSeguradoraDto,
      enderecoId: endereco,
    });

    return await this.seguradoraRepository.save(newSeguradora);
  }

  async findAll(): Promise<Seguradoras[]> {
    return await this.seguradoraRepository.find({ relations: ['enderecoId'] });
  }

  async findOne(id: number): Promise<Seguradoras> {
    const seguradora = await this.seguradoraRepository.findOne({
      where: { id },
      relations: ['enderecoId'],
    });
    if (!seguradora) {
      throw new NotFoundException(`Seguradora com ID ${id} não encontrada`);
    }
    return seguradora;
  }

  async update(
    id: number,
    updateSeguradoraDto: UpdateSeguradoraDto,
  ): Promise<Seguradoras> {
    const seguradora = await this.findOne(id);

    if (updateSeguradoraDto.enderecoId) {
      const endereco = await this.enderecosRepository.findOne({
        where: { id: updateSeguradoraDto.enderecoId },
      });
      if (!endereco) {
        throw new NotFoundException(
          `Endereço com ID ${updateSeguradoraDto.enderecoId} não encontrado`,
        );
      }
      seguradora.enderecoId = endereco;
    }

    // Remover enderecoId do DTO para evitar conflitos de tipo
    const { enderecoId, ...restUpdateDto } = updateSeguradoraDto;
    this.seguradoraRepository.merge(seguradora, restUpdateDto);

    return await this.seguradoraRepository.save(seguradora);
  }

  async remove(id: number): Promise<void> {
    const seguradora = await this.findOne(id);
    await this.seguradoraRepository.remove(seguradora);
  }
}

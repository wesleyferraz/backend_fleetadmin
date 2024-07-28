import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enderecos } from 'src/endereco/entities/endereco.entity';
import { Postos } from './entities/postos.entity';
import { CreatePostoDto } from './dto/create-posto.dto';
import { UpdatePostoDto } from './dto/update-posto.dto';

@Injectable()
export class PostoService {
  constructor(
    @InjectRepository(Postos)
    private readonly postoRepository: Repository<Postos>,
    @InjectRepository(Enderecos)
    private readonly enderecosRepository: Repository<Enderecos>,
  ) {}

  async create(CreatePostoDto: CreatePostoDto): Promise<Postos> {
    const endereco = await this.enderecosRepository.findOne({
      where: { id: CreatePostoDto.enderecoId },
    });
    if (!endereco) {
      throw new NotFoundException(
        `Endereço com ID ${CreatePostoDto.enderecoId} não encontrado`,
      );
    }

    const newPosto = this.postoRepository.create({
      ...CreatePostoDto,
      enderecoId: endereco,
    });

    return await this.postoRepository.save(newPosto);
  }

  async findAll(): Promise<Postos[]> {
    return await this.postoRepository.find({ relations: ['enderecoId'] });
  }

  async findOne(id: number): Promise<Postos> {
    const Posto = await this.postoRepository.findOne({
      where: { id },
      relations: ['enderecoId'],
    });
    if (!Posto) {
      throw new NotFoundException(`Posto com ID ${id} não encontrada`);
    }
    return Posto;
  }

  async update(id: number, UpdatePostoDto: UpdatePostoDto): Promise<Postos> {
    const Posto = await this.findOne(id);

    if (UpdatePostoDto.enderecoId) {
      const endereco = await this.enderecosRepository.findOne({
        where: { id: UpdatePostoDto.enderecoId },
      });
      if (!endereco) {
        throw new NotFoundException(
          `Endereço com ID ${UpdatePostoDto.enderecoId} não encontrado`,
        );
      }
      Posto.enderecoId = endereco;
    }

    // Remover enderecoId do DTO para evitar conflitos de tipo
    const { enderecoId, ...restUpdateDto } = UpdatePostoDto;
    this.postoRepository.merge(Posto, restUpdateDto);

    return await this.postoRepository.save(Posto);
  }

  async remove(id: number): Promise<void> {
    const Posto = await this.findOne(id);
    await this.postoRepository.remove(Posto);
  }
}

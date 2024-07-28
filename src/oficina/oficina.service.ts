import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Oficinas } from './entities/oficina.entity';
import { CreateOficinaDto } from './dto/create-oficina.dto';
import { UpdateOficinaDto } from './dto/update-oficina.dto';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Injectable()
export class OficinaService {
  constructor(
    @InjectRepository(Oficinas)
    private readonly oficinaRepository: Repository<Oficinas>,
    @InjectRepository(Enderecos)
    private readonly enderecosRepository: Repository<Enderecos>,
  ) {}

  async create(createOficinaDto: CreateOficinaDto): Promise<Oficinas> {
    const endereco = await this.enderecosRepository.findOne({
      where: { id: createOficinaDto.enderecoId },
    });
    if (!endereco) {
      throw new NotFoundException(
        `Endereço com ID ${createOficinaDto.enderecoId} não encontrado`,
      );
    }

    const newOficina = this.oficinaRepository.create({
      ...createOficinaDto,
      enderecoId: endereco,
    });

    return await this.oficinaRepository.save(newOficina);
  }

  async findAll(): Promise<Oficinas[]> {
    return await this.oficinaRepository.find({ relations: ['enderecoId'] });
  }

  async findOne(id: number): Promise<Oficinas> {
    const oficina = await this.oficinaRepository.findOne({
      where: { id },
      relations: ['enderecoId'],
    });
    if (!oficina) {
      throw new NotFoundException(`Oficina com ID ${id} não encontrada`);
    }
    return oficina;
  }

  async update(
    id: number,
    updateOficinaDto: UpdateOficinaDto,
  ): Promise<Oficinas> {
    const oficina = await this.findOne(id);

    if (updateOficinaDto.enderecoId) {
      const endereco = await this.enderecosRepository.findOne({
        where: { id: updateOficinaDto.enderecoId },
      });
      if (!endereco) {
        throw new NotFoundException(
          `Endereço com ID ${updateOficinaDto.enderecoId} não encontrado`,
        );
      }
      oficina.enderecoId = endereco;
    }

    // Remover enderecoId do DTO para evitar conflitos de tipo
    const { enderecoId, ...restUpdateDto } = updateOficinaDto;
    this.oficinaRepository.merge(oficina, restUpdateDto);

    return await this.oficinaRepository.save(oficina);
  }

  async remove(id: number): Promise<void> {
    const oficina = await this.findOne(id);
    await this.oficinaRepository.remove(oficina);
  }
}

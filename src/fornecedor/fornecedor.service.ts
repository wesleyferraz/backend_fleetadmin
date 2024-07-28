import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private readonly FornecedorRepository: Repository<Fornecedor>,
    @InjectRepository(Enderecos)
    private readonly enderecosRepository: Repository<Enderecos>,
  ) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    const endereco = await this.enderecosRepository.findOne({
      where: { id: createFornecedorDto.enderecoId },
    });
    if (!endereco) {
      throw new NotFoundException(
        `Endereço com ID ${createFornecedorDto.enderecoId} não encontrado`,
      );
    }

    const newFornecedor = this.FornecedorRepository.create({
      ...createFornecedorDto,
      enderecoId: endereco,
    });

    return await this.FornecedorRepository.save(newFornecedor);
  }

  async findAll(): Promise<Fornecedor[]> {
    return await this.FornecedorRepository.find({ relations: ['enderecoId'] });
  }

  async findOne(id: number): Promise<Fornecedor> {
    const Fornecedor = await this.FornecedorRepository.findOne({
      where: { id },
      relations: ['enderecoId'],
    });
    if (!Fornecedor) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrada`);
    }
    return Fornecedor;
  }

  async update(
    id: number,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    const Fornecedor = await this.findOne(id);

    if (updateFornecedorDto.enderecoId) {
      const endereco = await this.enderecosRepository.findOne({
        where: { id: updateFornecedorDto.enderecoId },
      });
      if (!endereco) {
        throw new NotFoundException(
          `Endereço com ID ${updateFornecedorDto.enderecoId} não encontrado`,
        );
      }
      Fornecedor.enderecoId = endereco;
    }

    // Remover enderecoId do DTO para evitar conflitos de tipo
    const { enderecoId, ...restUpdateDto } = updateFornecedorDto;
    this.FornecedorRepository.merge(Fornecedor, restUpdateDto);

    return await this.FornecedorRepository.save(Fornecedor);
  }

  async remove(id: number): Promise<void> {
    const Fornecedor = await this.findOne(id);
    await this.FornecedorRepository.remove(Fornecedor);
  }
}

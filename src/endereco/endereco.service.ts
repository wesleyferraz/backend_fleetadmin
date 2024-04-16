import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    const newEndereco = this.enderecoRepository.create(createEnderecoDto);
    return await this.enderecoRepository.save(newEndereco);
  }

  async findAll(): Promise<Endereco[]> {
    return await this.enderecoRepository.find();
  }

  async findOne(id: number): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) {
      throw new NotFoundException(`Endereco with ID ${id} not found`);
    }
    return endereco;
  }

  async update(
    id: number,
    updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<Endereco> {
    const endereco = await this.findOne(id);
    this.enderecoRepository.merge(endereco, updateEnderecoDto);
    return await this.enderecoRepository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.findOne(id);
    await this.enderecoRepository.remove(endereco);
  }
}

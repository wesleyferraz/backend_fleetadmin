import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Infracao } from './entities/infracao.entity';
import { CreateInfracaoDto } from './dto/create-infracao.dto';
import { UpdateInfracaoDto } from './dto/update-infracao.dto';

@Injectable()
export class InfracaoService {
  constructor(
    @InjectRepository(Infracao)
    private readonly infracaoRepository: Repository<Infracao>,
  ) {}

  async create(createInfracaoDto: CreateInfracaoDto): Promise<Infracao> {
    const newInfracao = this.infracaoRepository.create(createInfracaoDto);
    return await this.infracaoRepository.save(newInfracao);
  }

  async findAll(): Promise<Infracao[]> {
    return await this.infracaoRepository.find();
  }

  async findOne(id: number): Promise<Infracao> {
    const infracao = await this.infracaoRepository.findOneBy({ id });
    if (!infracao) {
      throw new NotFoundException(`Infracao with ID ${id} not found`);
    }
    return infracao;
  }

  async update(
    id: number,
    updateInfracaoDto: UpdateInfracaoDto,
  ): Promise<Infracao> {
    const infracao = await this.findOne(id);
    this.infracaoRepository.merge(infracao, updateInfracaoDto);
    return await this.infracaoRepository.save(infracao);
  }

  async remove(id: number): Promise<void> {
    const infracao = await this.findOne(id);
    await this.infracaoRepository.remove(infracao);
  }
}

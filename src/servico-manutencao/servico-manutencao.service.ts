import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServicoManutencao } from './entities/servico-manutencao.entity';
import { CreateServicoManutencaoDto } from './dto/create-servico-manutencao.dto';
import { UpdateServicoManutencaoDto } from './dto/update-servico-manutencao.dto';

@Injectable()
export class ServicoManutencaoService {
  constructor(
    @InjectRepository(ServicoManutencao)
    private readonly servicoManutencaoRepository: Repository<ServicoManutencao>,
  ) {}

  async create(
    createServicoManutencaoDto: CreateServicoManutencaoDto,
  ): Promise<ServicoManutencao> {
    const newServicoManutencao = this.servicoManutencaoRepository.create(
      createServicoManutencaoDto,
    );
    return await this.servicoManutencaoRepository.save(newServicoManutencao);
  }

  async findAll(): Promise<ServicoManutencao[]> {
    return await this.servicoManutencaoRepository.find();
  }

  async findOne(id: number): Promise<ServicoManutencao> {
    const servicoManutencao = await this.servicoManutencaoRepository.findOneBy({
      id,
    });
    if (!servicoManutencao) {
      throw new NotFoundException(`Serviço Manutenção with ID ${id} not found`);
    }
    return servicoManutencao;
  }

  async update(
    id: number,
    updateServicoManutencaoDto: UpdateServicoManutencaoDto,
  ): Promise<ServicoManutencao> {
    const servicoManutencao = await this.findOne(id);
    this.servicoManutencaoRepository.merge(
      servicoManutencao,
      updateServicoManutencaoDto,
    );
    return await this.servicoManutencaoRepository.save(servicoManutencao);
  }

  async remove(id: number): Promise<void> {
    const servicoManutencao = await this.findOne(id);
    await this.servicoManutencaoRepository.remove(servicoManutencao);
  }
}

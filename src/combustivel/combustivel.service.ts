import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Combustivel } from './entities/combustivel.entity';
import { CreateCombustivelDto } from './dto/createCombustivel.dto';
import { UpdateCombustivelDto } from './dto/updateCombustivel.dto';
import { Postos } from 'src/posto/entities/postos.entity';

@Injectable()
export class CombustivelService {
  constructor(
    @InjectRepository(Combustivel)
    private combustivelRepository: Repository<Combustivel>,
    @InjectRepository(Postos)
    private postosRepository: Repository<Postos>,
    @InjectRepository(Veiculos)
    private veiculoRepository: Repository<Veiculos>,
  ) {}

  async create(
    CreateCombustivelDto: CreateCombustivelDto,
  ): Promise<Combustivel> {
    const { posto_id, veiculo_id, ...CombustivelData } = CreateCombustivelDto;

    const posto = await this.postosRepository.findOne({
      where: { id: posto_id },
    });
    if (!posto) {
      throw new NotFoundException(`Posto #${posto_id} not found`);
    }

    const veiculo = await this.veiculoRepository.findOne({
      where: { id: veiculo_id },
    });
    if (!veiculo) {
      throw new NotFoundException(`Veiculo #${veiculo_id} not found`);
    }

    const combustivel = this.combustivelRepository.create({
      ...CombustivelData,
      posto,
      veiculo,
    });

    console.log('Valor:', combustivel);

    return this.combustivelRepository.save(combustivel);
  }

  async findAll(): Promise<Combustivel[]> {
    return this.combustivelRepository.find({
      relations: ['posto', 'veiculo'],
    });
  }

  async findOne(id: number): Promise<Combustivel> {
    const combustivel = await this.combustivelRepository.findOne({
      where: { id },
      relations: ['posto', 'veiculo'],
    });
    if (!combustivel) {
      throw new NotFoundException(`Combustivel #${id} not found`);
    }
    return combustivel;
  }

  async update(
    id: number,
    UpdateCombustivelDto: UpdateCombustivelDto,
  ): Promise<Combustivel> {
    const { posto_id, veiculo_id, ...CombustivelData } = UpdateCombustivelDto;

    const combustivel = await this.combustivelRepository.preload({
      id,
      ...CombustivelData,
    });
    if (!combustivel) {
      throw new NotFoundException(`Combustivel #${id} not found`);
    }

    if (posto_id) {
      const posto = await this.postosRepository.findOne({
        where: { id: posto_id },
      });
      if (!posto) {
        throw new NotFoundException(`Posto #${posto_id} not found`);
      }
      combustivel.posto = posto;
    }

    if (veiculo_id) {
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: veiculo_id },
      });
      if (!veiculo) {
        throw new NotFoundException(`Veiculo #${veiculo_id} not found`);
      }
      combustivel.veiculo = veiculo;
    }

    return this.combustivelRepository.save(combustivel);
  }

  async remove(id: number): Promise<void> {
    const combustivel = await this.findOne(id);
    await this.combustivelRepository.remove(combustivel);
  }
}

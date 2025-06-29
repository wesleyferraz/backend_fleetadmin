import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Abastecimento } from './entities/abastecimento.entity';
import { CreateAbastecimentoDto } from './dto/createAbastecimento.dto';
import { UpdateAbastecimentoDto } from './dto/updateAbastecimento.dto';
import { Postos } from 'src/posto/entities/postos.entity';

@Injectable()
export class AbastecimentoService {
  constructor(
    @InjectRepository(Abastecimento)
    private abastecimentoRepository: Repository<Abastecimento>,
    @InjectRepository(Postos)
    private postosRepository: Repository<Postos>,
    @InjectRepository(Veiculos)
    private veiculoRepository: Repository<Veiculos>,
  ) {}

  async create(
    CreateAbastecimentoDto: CreateAbastecimentoDto,
  ): Promise<Abastecimento> {
    const { posto_id, veiculo_id, ...AbastecimentoData } =
      CreateAbastecimentoDto;

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

    const abastecimento = this.abastecimentoRepository.create({
      ...AbastecimentoData,
      posto,
      veiculo,
    });

    return this.abastecimentoRepository.save(abastecimento);
  }

  async findAll(): Promise<Abastecimento[]> {
    return this.abastecimentoRepository.find({
      relations: ['posto', 'veiculo'],
    });
  }

  async findOne(id: number): Promise<Abastecimento> {
    const abastecimento = await this.abastecimentoRepository.findOne({
      where: { id },
      relations: ['posto', 'veiculo'],
    });
    if (!abastecimento) {
      throw new NotFoundException(`Abastecimento #${id} not found`);
    }
    return abastecimento;
  }

  async update(
    id: number,
    UpdateAbastecimentoDto: UpdateAbastecimentoDto,
  ): Promise<Abastecimento> {
    const { posto_id, veiculo_id, ...AbastecimentoData } =
      UpdateAbastecimentoDto;

    const abastecimento = await this.abastecimentoRepository.preload({
      id,
      ...AbastecimentoData,
    });
    if (!abastecimento) {
      throw new NotFoundException(`Abastecimento #${id} not found`);
    }

    if (posto_id) {
      const posto = await this.postosRepository.findOne({
        where: { id: posto_id },
      });
      if (!posto) {
        throw new NotFoundException(`Posto #${posto_id} not found`);
      }
      abastecimento.posto = posto;
    }

    if (veiculo_id) {
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: veiculo_id },
      });
      if (!veiculo) {
        throw new NotFoundException(`Veiculo #${veiculo_id} not found`);
      }
      abastecimento.veiculo = veiculo;
    }

    return this.abastecimentoRepository.save(abastecimento);
  }

  async remove(id: number): Promise<void> {
    const abastecimento = await this.findOne(id);
    await this.abastecimentoRepository.remove(abastecimento);
  }
}

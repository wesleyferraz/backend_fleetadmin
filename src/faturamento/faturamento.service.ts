import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faturamento } from './entity/faturamento.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Motoristas } from 'src/motorista/entities/motorista.entity';
import { CreateFaturamentoDto } from './dto/create-faturamento.dto';
import { UpdateFaturamentoDto } from './dto/update-faturamento.dto';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Injectable()
export class FaturamentoService {
  constructor(
    @InjectRepository(Faturamento)
    private faturamentoRepository: Repository<Faturamento>,
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
    @InjectRepository(Motoristas)
    private motoristaRepository: Repository<Motoristas>,
    @InjectRepository(Veiculos)
    private veiculoRepository: Repository<Veiculos>,
  ) {}

  async create(
    createFaturamentoDto: CreateFaturamentoDto,
  ): Promise<Faturamento> {
    const { fornecedorId, motoristaId, veiculoId, ...faturamentoData } =
      createFaturamentoDto;

    const fornecedor = await this.fornecedorRepository.findOne({
      where: { id: fornecedorId },
    });
    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor #${fornecedorId} not found`);
    }

    const motorista = await this.motoristaRepository.findOne({
      where: { id: motoristaId },
    });
    if (!motorista) {
      throw new NotFoundException(`Motorista #${motoristaId} not found`);
    }

    const veiculo = await this.veiculoRepository.findOne({
      where: { id: veiculoId },
    });
    if (!veiculo) {
      throw new NotFoundException(`Veiculo #${veiculoId} not found`);
    }

    const faturamento = this.faturamentoRepository.create({
      ...faturamentoData,
      fornecedor,
      motorista,
      veiculo,
    });

    return this.faturamentoRepository.save(faturamento);
  }

  async findAll(): Promise<Faturamento[]> {
    return this.faturamentoRepository.find({
      relations: ['fornecedor', 'motorista', 'veiculo'],
    });
  }

  async findOne(id: number): Promise<Faturamento> {
    const faturamento = await this.faturamentoRepository.findOne({
      where: { id },
      relations: ['fornecedor', 'motorista', 'veiculo'],
    });
    if (!faturamento) {
      throw new NotFoundException(`Faturamento #${id} not found`);
    }
    return faturamento;
  }

  async update(
    id: number,
    updateFaturamentoDto: UpdateFaturamentoDto,
  ): Promise<Faturamento> {
    const { fornecedorId, motoristaId, veiculoId, ...faturamentoData } =
      updateFaturamentoDto;

    const faturamento = await this.faturamentoRepository.preload({
      id,
      ...faturamentoData,
    });
    if (!faturamento) {
      throw new NotFoundException(`Faturamento #${id} not found`);
    }

    if (fornecedorId) {
      const fornecedor = await this.fornecedorRepository.findOne({
        where: { id: fornecedorId },
      });
      if (!fornecedor) {
        throw new NotFoundException(`Fornecedor #${fornecedorId} not found`);
      }
      faturamento.fornecedor = fornecedor;
    }

    if (motoristaId) {
      const motorista = await this.motoristaRepository.findOne({
        where: { id: motoristaId },
      });
      if (!motorista) {
        throw new NotFoundException(`Motorista #${motoristaId} not found`);
      }
      faturamento.motorista = motorista;
    }

    if (veiculoId) {
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: veiculoId },
      });
      if (!veiculo) {
        throw new NotFoundException(`Fornecedor #${veiculoId} not found`);
      }
      faturamento.veiculo = veiculo;
    }

    return this.faturamentoRepository.save(faturamento);
  }

  async remove(id: number): Promise<void> {
    const faturamento = await this.findOne(id);
    await this.faturamentoRepository.remove(faturamento);
  }
}

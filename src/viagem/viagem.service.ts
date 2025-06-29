import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Viagem } from './entity/viagem.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Motoristas } from 'src/motorista/entities/motorista.entity';
import { CreateViagemDto } from './dto/create-viagem.dto';
import { UpdateViagemDto } from './dto/update-viagem.dto';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Injectable()
export class ViagemService {
  constructor(
    @InjectRepository(Viagem)
    private viagemRepository: Repository<Viagem>,
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
    @InjectRepository(Motoristas)
    private motoristaRepository: Repository<Motoristas>,
    @InjectRepository(Veiculos)
    private veiculoRepository: Repository<Veiculos>,
  ) {}

  async create(createViagemDto: CreateViagemDto): Promise<Viagem> {
    const { fornecedorId, motoristaId, veiculoId, ...viagemData } =
      createViagemDto;

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

    const viagem = this.viagemRepository.create({
      ...viagemData,
      fornecedor,
      motorista,
      veiculo,
    });

    return this.viagemRepository.save(viagem);
  }

  async findAll(): Promise<Viagem[]> {
    return this.viagemRepository.find({
      relations: ['fornecedor', 'motorista', 'veiculo'],
    });
  }

  async findOne(id: number): Promise<Viagem> {
    const viagem = await this.viagemRepository.findOne({
      where: { id },
      relations: ['fornecedor', 'motorista', 'veiculo'],
    });
    if (!viagem) {
      throw new NotFoundException(`Viagem #${id} not found`);
    }
    return viagem;
  }

  async update(id: number, updateViagemDto: UpdateViagemDto): Promise<Viagem> {
    const { fornecedorId, motoristaId, veiculoId, ...viagemData } =
      updateViagemDto;

    const viagem = await this.viagemRepository.preload({
      id,
      ...viagemData,
    });
    if (!viagem) {
      throw new NotFoundException(`Viagem #${id} not found`);
    }

    if (fornecedorId) {
      const fornecedor = await this.fornecedorRepository.findOne({
        where: { id: fornecedorId },
      });
      if (!fornecedor) {
        throw new NotFoundException(`Fornecedor #${fornecedorId} not found`);
      }
      viagem.fornecedor = fornecedor;
    }

    if (motoristaId) {
      const motorista = await this.motoristaRepository.findOne({
        where: { id: motoristaId },
      });
      if (!motorista) {
        throw new NotFoundException(`Motorista #${motoristaId} not found`);
      }
      viagem.motorista = motorista;
    }

    if (veiculoId) {
      const veiculo = await this.veiculoRepository.findOne({
        where: { id: veiculoId },
      });
      if (!veiculo) {
        throw new NotFoundException(`Fornecedor #${veiculoId} not found`);
      }
      viagem.veiculo = veiculo;
    }

    return this.viagemRepository.save(viagem);
  }

  async remove(id: number): Promise<void> {
    const viagem = await this.findOne(id);
    await this.viagemRepository.remove(viagem);
  }
}

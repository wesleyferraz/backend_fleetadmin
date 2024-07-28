import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculos } from './entities/veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculos)
    private readonly veiculosRepository: Repository<Veiculos>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculos> {
    const newVeiculo = this.veiculosRepository.create(createVeiculoDto);
    return await this.veiculosRepository.save(newVeiculo);
  }

  async findAll(): Promise<Veiculos[]> {
    return await this.veiculosRepository.find();
  }

  async findOne(id: number): Promise<Veiculos> {
    const veiculo = await this.veiculosRepository.findOneBy({ id });
    if (!veiculo) {
      throw new NotFoundException(`Veiculo with ID ${id} not found`);
    }
    return veiculo;
  }

  async update(
    id: number,
    updateVeiculoDto: UpdateVeiculoDto,
  ): Promise<Veiculos> {
    const veiculo = await this.findOne(id);
    this.veiculosRepository.merge(veiculo, updateVeiculoDto);
    return await this.veiculosRepository.save(veiculo);
  }

  async remove(id: number): Promise<void> {
    const veiculo = await this.findOne(id);
    await this.veiculosRepository.remove(veiculo);
  }
}

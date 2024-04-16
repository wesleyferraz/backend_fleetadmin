import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculoService {
  constructor(
    @InjectRepository(Veiculo)
    private readonly veiculoRepository: Repository<Veiculo>,
  ) {}

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    const newVeiculo = this.veiculoRepository.create(createVeiculoDto);
    return await this.veiculoRepository.save(newVeiculo);
  }

  async findAll(): Promise<Veiculo[]> {
    return await this.veiculoRepository.find();
  }

  async findOne(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculoRepository.findOneBy({ id });
    if (!veiculo) {
      throw new NotFoundException(`Veiculo with ID ${id} not found`);
    }
    return veiculo;
  }

  async update(
    id: number,
    updateVeiculoDto: UpdateVeiculoDto,
  ): Promise<Veiculo> {
    const veiculo = await this.findOne(id);
    this.veiculoRepository.merge(veiculo, updateVeiculoDto);
    return await this.veiculoRepository.save(veiculo);
  }

  async remove(id: number): Promise<void> {
    const veiculo = await this.findOne(id);
    await this.veiculoRepository.remove(veiculo);
  }
}

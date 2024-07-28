import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motoristas } from './entities/motorista.entity';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
import { Enderecos } from 'src/endereco/entities/endereco.entity';

@Injectable()
export class MotoristaService {
  constructor(
    @InjectRepository(Motoristas)
    private readonly motoristaRepository: Repository<Motoristas>,
    @InjectRepository(Enderecos)
    private readonly enderecoRepository: Repository<Enderecos>,
  ) {}

  async create(createMotoristaDto: CreateMotoristaDto): Promise<Motoristas> {
    const { enderecoId, ...rest } = createMotoristaDto;
    const endereco = await this.enderecoRepository.findOne({
      where: { id: enderecoId },
    });
    if (!endereco) {
      throw new NotFoundException('Endereço não encontrado');
    }

    const newMotorista = this.motoristaRepository.create({
      ...rest,
      enderecoId: endereco,
    });

    return await this.motoristaRepository.save(newMotorista);
  }

  async findAll(): Promise<Motoristas[]> {
    return await this.motoristaRepository.find({ relations: ['enderecoId'] });
  }

  async findOne(id: number): Promise<Motoristas> {
    const motorista = await this.motoristaRepository.findOne({
      where: { id },
      relations: ['enderecoId'],
    });
    if (!motorista) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`);
    }
    return motorista;
  }

  async update(
    id: number,
    updateMotoristaDto: UpdateMotoristaDto,
  ): Promise<Motoristas> {
    const motorista = await this.findOne(id);
    const { enderecoId, ...rest } = updateMotoristaDto;

    if (enderecoId) {
      const endereco = await this.enderecoRepository.findOne({
        where: { id: enderecoId },
      });
      if (!endereco) {
        throw new NotFoundException('Endereço não encontrado');
      }
      motorista.enderecoId = endereco;
    }

    this.motoristaRepository.merge(motorista, rest);
    return await this.motoristaRepository.save(motorista);
  }

  async remove(id: number): Promise<void> {
    const motorista = await this.findOne(id);
    await this.motoristaRepository.remove(motorista);
  }
}

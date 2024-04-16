import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Motorista } from './entities/motorista.entity';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristaService {
  constructor(
    @InjectRepository(Motorista)
    private readonly motoristaRepository: Repository<Motorista>,
  ) {}

  async create(createMotoristaDto: CreateMotoristaDto): Promise<Motorista> {
    const newMotorista = this.motoristaRepository.create(createMotoristaDto);
    return await this.motoristaRepository.save(newMotorista);
  }

  async findAll(): Promise<Motorista[]> {
    return await this.motoristaRepository.find();
  }

  async findOne(cpf: string): Promise<Motorista> {
    const motorista = await this.motoristaRepository.findOneBy({ cpf });
    if (!motorista) {
      throw new NotFoundException(`Motorista with CPF ${cpf} not found`);
    }
    return motorista;
  }

  async update(
    cpf: string,
    updateMotoristaDto: UpdateMotoristaDto,
  ): Promise<Motorista> {
    const motorista = await this.findOne(cpf);
    this.motoristaRepository.merge(motorista, updateMotoristaDto);
    return await this.motoristaRepository.save(motorista);
  }

  async remove(cpf: string): Promise<void> {
    const motorista = await this.findOne(cpf);
    await this.motoristaRepository.remove(motorista);
  }
}

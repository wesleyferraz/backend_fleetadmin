import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Oleo } from './entities/oleo.entity';
import { CreateOleoDto } from './dto/create-oleo.dto';
import { UpdateOleoDto } from './dto/update-oleo.dto';
import { Postos } from 'src/posto/entities/postos.entity';

@Injectable()
export class OleoService {
  constructor(
    @InjectRepository(Oleo)
    private OleoRepository: Repository<Oleo>,
  ) {}

  async create(CreateOleoDto: CreateOleoDto): Promise<Oleo> {
    const OleoData = CreateOleoDto;
    const Oleo = this.OleoRepository.create(OleoData);
    return this.OleoRepository.save(Oleo);
  }

  async findAll(): Promise<Oleo[]> {
    return this.OleoRepository.find();
  }

  async findOne(id: number): Promise<Oleo> {
    const Oleo = await this.OleoRepository.findOne({
      where: { id },
    });
    if (!Oleo) {
      throw new NotFoundException(`Oleo #${id} not found`);
    }
    return Oleo;
  }

  async update(id: number, UpdateOleoDto: UpdateOleoDto): Promise<Oleo> {
    const OleoData = UpdateOleoDto;

    const Oleo = await this.OleoRepository.preload({
      id,
      ...OleoData,
    });
    if (!Oleo) {
      throw new NotFoundException(`Oleo #${id} not found`);
    }

    return this.OleoRepository.save(Oleo);
  }

  async remove(id: number): Promise<void> {
    const Oleo = await this.findOne(id);
    await this.OleoRepository.remove(Oleo);
  }
}

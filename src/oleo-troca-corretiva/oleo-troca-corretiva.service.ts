import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OleoTrocadoCorretiva } from './entities/oleo-troca-corretiva.entity';
import { CreateOleoTrocadaCorretivaDto } from './dto/create-oleo-troca-corretiva.dto';
import { UpdateOleoTrocadaCorretivaDto } from './dto/update-oleo-troca-corretiva.dto';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Oleo } from 'src/oleo/entities/oleo.entity';
@Injectable()
export class OleoTrocaCorretivaService {
  constructor(
    @InjectRepository(OleoTrocadoCorretiva)
    private readonly oleoTrocaCorretivaRepository: Repository<OleoTrocadoCorretiva>,
    @InjectRepository(ManutencoesCorretivas)
    private readonly manutencoesCorretivasRepository: Repository<ManutencoesCorretivas>,
    @InjectRepository(Oleo)
    private readonly oleosRepository: Repository<Oleo>,
  ) {}

  async create(
    createOleoTrocaCorretivaDto: CreateOleoTrocadaCorretivaDto,
  ): Promise<OleoTrocadoCorretiva> {
    const manutencaoCorretiva =
      await this.manutencoesCorretivasRepository.findOneBy({
        id: createOleoTrocaCorretivaDto.manutencaoCorretivaId,
      });
    const oleo = await this.oleosRepository.findOneBy({
      id: createOleoTrocaCorretivaDto.oleoId,
    });

    if (!manutencaoCorretiva || !oleo) {
      throw new NotFoundException(
        'Manutenção corretiva ou peça não encontrada',
      );
    }

    const newoleoTrocaCorretiva = this.oleoTrocaCorretivaRepository.create({
      ...createOleoTrocaCorretivaDto,
      manutencaoCorretiva,
      oleo,
    });

    return await this.oleoTrocaCorretivaRepository.save(newoleoTrocaCorretiva);
  }

  async findAll(): Promise<OleoTrocadoCorretiva[]> {
    return await this.oleoTrocaCorretivaRepository.find({
      relations: ['manutencaoCorretiva', 'oleo'],
    });
  }

  async findOne(id: number): Promise<OleoTrocadoCorretiva> {
    const oleoTrocaCorretiva = await this.oleoTrocaCorretivaRepository.findOne({
      where: { id },
      relations: ['manutencaoCorretiva', 'oleo'],
    });
    if (!oleoTrocaCorretiva) {
      throw new NotFoundException(
        `Peça Troca Corretiva com ID ${id} não encontrada`,
      );
    }
    return oleoTrocaCorretiva;
  }

  async update(
    id: number,
    updateoleoTrocaCorretivaDto: UpdateOleoTrocadaCorretivaDto,
  ): Promise<OleoTrocadoCorretiva> {
    const oleoTrocaCorretiva = await this.findOne(id);

    if (updateoleoTrocaCorretivaDto.manutencaoCorretivaId) {
      const manutencaoCorretiva =
        await this.manutencoesCorretivasRepository.findOneBy({
          id: updateoleoTrocaCorretivaDto.manutencaoCorretivaId,
        });
      if (!manutencaoCorretiva) {
        throw new NotFoundException('Manutenção corretiva não encontrada');
      }
      oleoTrocaCorretiva.manutencaoCorretiva = manutencaoCorretiva;
    }

    if (updateoleoTrocaCorretivaDto.oleoId) {
      const oleo = await this.oleosRepository.findOneBy({
        id: updateoleoTrocaCorretivaDto.oleoId,
      });
      if (!oleo) {
        throw new NotFoundException('Peça não encontrada');
      }
      oleoTrocaCorretiva.oleo = oleo;
    }

    this.oleoTrocaCorretivaRepository.merge(
      oleoTrocaCorretiva,
      updateoleoTrocaCorretivaDto,
    );
    return await this.oleoTrocaCorretivaRepository.save(oleoTrocaCorretiva);
  }

  async remove(id: number): Promise<void> {
    const oleoTrocaCorretiva = await this.findOne(id);
    await this.oleoTrocaCorretivaRepository.remove(oleoTrocaCorretiva);
  }
}

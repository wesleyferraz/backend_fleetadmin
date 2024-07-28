import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PecasTrocadasCorretiva } from './entities/peca-troca-corretiva.entity';
import { CreatePecaTrocadaCorretivaDto } from './dto/create-peca-troca-corretiva.dto';
import { UpdatePecaTrocadaCorretivaDto } from './dto/update-peca-troca-corretiva.dto';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Pecas } from 'src/peca/entities/peca.entity';

@Injectable()
export class PecaTrocaCorretivaService {
  constructor(
    @InjectRepository(PecasTrocadasCorretiva)
    private readonly pecaTrocaCorretivaRepository: Repository<PecasTrocadasCorretiva>,
    @InjectRepository(ManutencoesCorretivas)
    private readonly manutencoesCorretivasRepository: Repository<ManutencoesCorretivas>,
    @InjectRepository(Pecas)
    private readonly pecasRepository: Repository<Pecas>,
  ) {}

  async create(
    createPecaTrocaCorretivaDto: CreatePecaTrocadaCorretivaDto,
  ): Promise<PecasTrocadasCorretiva> {
    const manutencaoCorretiva =
      await this.manutencoesCorretivasRepository.findOneBy({
        id: createPecaTrocaCorretivaDto.manutencaoCorretivaId,
      });
    const peca = await this.pecasRepository.findOneBy({
      id: createPecaTrocaCorretivaDto.pecaId,
    });

    if (!manutencaoCorretiva || !peca) {
      throw new NotFoundException(
        'Manutenção corretiva ou peça não encontrada',
      );
    }

    const newPecaTrocaCorretiva = this.pecaTrocaCorretivaRepository.create({
      ...createPecaTrocaCorretivaDto,
      manutencaoCorretiva,
      peca,
    });

    return await this.pecaTrocaCorretivaRepository.save(newPecaTrocaCorretiva);
  }

  async findAll(): Promise<PecasTrocadasCorretiva[]> {
    return await this.pecaTrocaCorretivaRepository.find({
      relations: ['manutencaoCorretiva', 'peca'],
    });
  }

  async findOne(id: number): Promise<PecasTrocadasCorretiva> {
    const pecaTrocaCorretiva = await this.pecaTrocaCorretivaRepository.findOne({
      where: { id },
      relations: ['manutencaoCorretiva', 'peca'],
    });
    if (!pecaTrocaCorretiva) {
      throw new NotFoundException(
        `Peça Troca Corretiva com ID ${id} não encontrada`,
      );
    }
    return pecaTrocaCorretiva;
  }

  async update(
    id: number,
    updatePecaTrocaCorretivaDto: UpdatePecaTrocadaCorretivaDto,
  ): Promise<PecasTrocadasCorretiva> {
    const pecaTrocaCorretiva = await this.findOne(id);

    if (updatePecaTrocaCorretivaDto.manutencaoCorretivaId) {
      const manutencaoCorretiva =
        await this.manutencoesCorretivasRepository.findOneBy({
          id: updatePecaTrocaCorretivaDto.manutencaoCorretivaId,
        });
      if (!manutencaoCorretiva) {
        throw new NotFoundException('Manutenção corretiva não encontrada');
      }
      pecaTrocaCorretiva.manutencaoCorretiva = manutencaoCorretiva;
    }

    if (updatePecaTrocaCorretivaDto.pecaId) {
      const peca = await this.pecasRepository.findOneBy({
        id: updatePecaTrocaCorretivaDto.pecaId,
      });
      if (!peca) {
        throw new NotFoundException('Peça não encontrada');
      }
      pecaTrocaCorretiva.peca = peca;
    }

    this.pecaTrocaCorretivaRepository.merge(
      pecaTrocaCorretiva,
      updatePecaTrocaCorretivaDto,
    );
    return await this.pecaTrocaCorretivaRepository.save(pecaTrocaCorretiva);
  }

  async remove(id: number): Promise<void> {
    const pecaTrocaCorretiva = await this.findOne(id);
    await this.pecaTrocaCorretivaRepository.remove(pecaTrocaCorretiva);
  }
}

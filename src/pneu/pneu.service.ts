import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pneu } from './entities/pneu.entity';
import { CreatePneuDto } from './dto/create-pneu.dto';
import { UpdatePneuDto } from './dto/update-pneu.dto';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { GetAllByVeiculoDto } from './dto/getAllByVeiculo.dto';

@Injectable()
export class PneuService {
  constructor(
    @InjectRepository(Pneu)
    private readonly pneuRepository: Repository<Pneu>,

    @InjectRepository(Veiculos)
    private readonly veiculosRepository: Repository<Veiculos>,
  ) {}

  async create(CreatePneuDto: CreatePneuDto): Promise<Pneu> {
    await this.updateVeiculoIdToZero(
      CreatePneuDto.veiculoId,
      CreatePneuDto.posicao,
    );
    const veiculo = await this.veiculosRepository.findOne({
      where: { id: CreatePneuDto.veiculoId },
    });
    if (!veiculo) {
      throw new NotFoundException(
        `Veículo com ID ${CreatePneuDto.veiculoId} não encontrado`,
      );
    }

    const newPneu = this.pneuRepository.create({
      ...CreatePneuDto,
      veiculo: veiculo, // Aqui é veiculo e não veiculoId
    });

    return await this.pneuRepository.save(newPneu);
  }

  async findAll(): Promise<Pneu[]> {
    return await this.pneuRepository.find({
      relations: ['veiculo'],
    });
  }

  async findOne(id: number): Promise<Pneu> {
    const pneu = await this.pneuRepository.findOne({
      where: { id },
      relations: ['veiculo'],
    });
    if (!pneu) {
      throw new NotFoundException(`Pneu com ID ${id} não encontrado`);
    }
    return pneu;
  }

  async update(id: number, UpdatePneuDto: UpdatePneuDto): Promise<Pneu> {
    const pneu = await this.findOne(id);

    if (UpdatePneuDto.veiculoId != 0) {
      await this.updateVeiculoIdToZero(
        UpdatePneuDto.veiculoId,
        UpdatePneuDto.posicao,
      );

      if (UpdatePneuDto.veiculoId) {
        const veiculo = await this.veiculosRepository.findOne({
          where: { id: UpdatePneuDto.veiculoId },
        });
        if (!veiculo) {
          throw new NotFoundException(
            `Veículo com ID ${UpdatePneuDto.veiculoId} não encontrado`,
          );
        }
        pneu.veiculo = veiculo;
      }
    } else {
      pneu.veiculo = null;
    }

    const { veiculoId, ...restUpdateDto } = UpdatePneuDto;
    this.pneuRepository.merge(pneu, restUpdateDto);

    return await this.pneuRepository.save(pneu);
  }

  async remove(id: number): Promise<void> {
    const pneu = await this.findOne(id);
    await this.pneuRepository.remove(pneu);
  }

  async findAllByVeiculoId(veiculoId: number): Promise<CreatePneuDto[]> {
    const pneus = await this.pneuRepository.find({
      where: {
        veiculo: { id: veiculoId },
      },
      relations: ['veiculo'],
    });

    return pneus.map((pneu) => {
      const {
        id,
        marca,
        tipo,
        tipo_de_borracha,
        recapagem,
        local_de_instalacao,
        referencia,
        posicao,
      } = pneu;
      return {
        id,
        marca,
        tipo,
        tipo_de_borracha,
        recapagem,
        local_de_instalacao,
        referencia,
        posicao,
        veiculoId: pneu.veiculo.id,
      };
    });
  }

  async updateVeiculoIdToZero(
    veiculoId: number,
    posicao: number,
  ): Promise<Pneu | void> {
    const existingPneu = await this.pneuRepository.findOne({
      where: {
        veiculo: { id: veiculoId },
        posicao: posicao,
      },
      relations: ['veiculo'],
    });

    if (!existingPneu) {
      console.log('Pneu not found: ID:', veiculoId, 'Position:', posicao);
      return;
    }

    existingPneu.veiculo = null;
    existingPneu.posicao = 0;

    return this.pneuRepository.save(existingPneu);
  }
}

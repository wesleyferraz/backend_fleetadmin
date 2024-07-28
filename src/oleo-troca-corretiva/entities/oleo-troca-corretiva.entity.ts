// pecas-trocadas-corretiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Oleo } from 'src/oleo/entities/oleo.entity';
@Entity()
export class OleoTrocadoCorretiva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ManutencoesCorretivas)
  @JoinColumn({ name: 'manutencaoCorretivaId' })
  manutencaoCorretiva: ManutencoesCorretivas;

  @ManyToOne(() => Oleo, (oleo) => oleo.id)
  @JoinColumn({ name: 'oleoId' })
  oleo: Oleo;

  @Column({ name: 'quantidade', type: 'decimal', precision: 10, scale: 2 })
  quantidade: number;

  @Column({ name: 'valorUnitario', type: 'decimal', precision: 10, scale: 2 })
  valorUnitario: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;
}

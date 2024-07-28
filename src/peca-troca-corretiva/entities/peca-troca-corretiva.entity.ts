// pecas-trocadas-corretiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Pecas } from 'src/peca/entities/peca.entity';
@Entity()
export class PecasTrocadasCorretiva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ManutencoesCorretivas)
  @JoinColumn({ name: 'manutencaoCorretivaId' })
  manutencaoCorretiva: ManutencoesCorretivas;

  @ManyToOne(() => Pecas, (peca) => peca.id)
  @JoinColumn({ name: 'pecaId' })
  peca: Pecas;

  @Column({ name: 'quantidade', type: 'decimal', precision: 10, scale: 2 })
  quantidade: number;

  @Column({ name: 'valorUnitario', type: 'decimal', precision: 10, scale: 2 })
  valorUnitario: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;
}

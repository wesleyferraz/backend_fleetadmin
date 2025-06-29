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
  manutencaoCorretiva: ManutencoesCorretivas;

  @ManyToOne(() => Pecas) // Adiciona a relação com a entidade Oleo
  @JoinColumn({ name: 'pecaId' }) // Define a coluna que faz a referência ao óleo
  peca: Pecas; // Relacionamento com o óleo trocado

  @Column({ name: 'quantidade', type: 'decimal', precision: 10, scale: 2 })
  quantidade: number;

  @Column({ name: 'valorUnitario', type: 'decimal', precision: 10, scale: 2 })
  valorUnitario: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;
}

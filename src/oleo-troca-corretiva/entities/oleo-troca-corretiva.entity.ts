import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ManutencoesCorretivas } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Oleo } from 'src/oleo/entities/oleo.entity';

@Entity()
export class OleoTrocadoCorretiva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantidade', type: 'decimal', precision: 10, scale: 2 })
  quantidade: number;

  @Column({ name: 'valorUnitario', type: 'decimal', precision: 10, scale: 2 })
  valorUnitario: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @ManyToOne(
    () => ManutencoesCorretivas,
    (manutencaoCorretiva) => manutencaoCorretiva.oleoTrocadoCorretiva,
  )
  @JoinColumn({ name: 'manutencaoCorretivaId' })
  manutencaoCorretiva: ManutencoesCorretivas;

  @ManyToOne(() => Oleo) // Adiciona a relação com a entidade Oleo
  @JoinColumn({ name: 'oleoId' }) // Define a coluna que faz a referência ao óleo
  oleo: Oleo; // Relacionamento com o óleo trocado
}

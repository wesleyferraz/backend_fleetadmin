// peca-troca-corretiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ManutencaoCorretiva } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { Peca } from 'src/peca/entities/peca.entity';
@Entity()
export class PecaTrocaCorretiva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ManutencaoCorretiva,
    (manutencaoCorretiva) => manutencaoCorretiva.id,
  )
  @JoinColumn({ name: 'manutencao_corretiva_id' })
  manutencaoCorretiva: ManutencaoCorretiva;

  @ManyToOne(() => Peca, (peca) => peca.id)
  @JoinColumn({ name: 'peca_id' })
  peca: Peca;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}

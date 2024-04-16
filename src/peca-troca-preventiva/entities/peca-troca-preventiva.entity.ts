// peca-troca-preventiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ManutencaoPreventiva } from 'src/manutencao-preventiva/entities/manutencao-preventiva.entity';
import { Peca } from 'src/peca/entities/peca.entity';

@Entity()
export class PecaTrocaPreventiva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ManutencaoPreventiva,
    (manutencaoPreventiva) => manutencaoPreventiva.id,
  )
  @JoinColumn({ name: 'manutencao_preventiva_id' })
  manutencaoPreventiva: ManutencaoPreventiva;

  @ManyToOne(() => Peca, (peca) => peca.id)
  @JoinColumn({ name: 'peca_id' })
  peca: Peca;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}

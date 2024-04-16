// servico-realizado-corretiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ManutencaoCorretiva } from 'src/manutencao-corretiva/entities/manutencao-corretiva.entity';
import { ServicoManutencao } from 'src/servico-manutencao/entities/servico-manutencao.entity';
@Entity()
export class ServicoRealizadoCorretiva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ManutencaoCorretiva,
    (manutencaoCorretiva) => manutencaoCorretiva.id,
  )
  @JoinColumn({ name: 'manutencao_corretiva_id' })
  manutencaoCorretiva: ManutencaoCorretiva;

  @ManyToOne(
    () => ServicoManutencao,
    (servicoManutencao) => servicoManutencao.id,
  )
  @JoinColumn({ name: 'servico_id' })
  servicoManutencao: ServicoManutencao;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}

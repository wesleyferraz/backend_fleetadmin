// servico-realizado-preventiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { ManutencaoPreventiva } from 'src/manutencao-preventiva/entities/manutencao-preventiva.entity';
import { ServicoManutencao } from 'src/servico-manutencao/entities/servico-manutencao.entity';

@Entity()
export class ServicoRealizadoPreventiva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ManutencaoPreventiva,
    (manutencaoPreventiva) => manutencaoPreventiva.id,
  )
  @JoinColumn({ name: 'manutencao_preventiva_id' })
  manutencaoPreventiva: ManutencaoPreventiva;

  @ManyToOne(
    () => ServicoManutencao,
    (servicoManutencao) => servicoManutencao.id,
  )
  @JoinColumn({ name: 'servico_id' })
  servicoManutencao: ServicoManutencao;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}

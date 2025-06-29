// manutencao-corretiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Oficinas } from 'src/oficina/entities/oficina.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { OleoTrocadoCorretiva } from 'src/oleo-troca-corretiva/entities/oleo-troca-corretiva.entity';
import { PecasTrocadasCorretiva } from 'src/peca-troca-corretiva/entities/peca-troca-corretiva.entity';

@Entity()
export class ManutencoesCorretivas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @Column({ name: 'kmManutencao', type: 'decimal', precision: 10, scale: 2 })
  kmManutencao: number;

  @Column({
    name: 'kmProximaManutencao',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  kmProximaManutencao: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @ManyToOne(() => Oficinas)
  @JoinColumn({ name: 'oficinaId' })
  oficinaId: Oficinas;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculoId' })
  veiculoId: Veiculos;

  @OneToMany(
    () => PecasTrocadasCorretiva,
    (pecaTrocada) => pecaTrocada.manutencaoCorretiva,
  )
  pecasTrocadasCorretiva: PecasTrocadasCorretiva[];

  @OneToMany(
    () => OleoTrocadoCorretiva,
    (oleoTrocado) => oleoTrocado.manutencaoCorretiva,
  )
  oleoTrocadoCorretiva: OleoTrocadoCorretiva[];
}

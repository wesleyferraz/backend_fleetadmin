// manutencao-corretiva.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Oficinas } from 'src/oficina/entities/oficina.entity';
import { Veiculos } from 'src/veiculo/entities/veiculo.entity';

@Entity()
export class ManutencoesCorretivas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @Column({ name: 'kmManutencao', type: 'int' })
  kmManutencao: number;

  @Column({ name: 'valorTotal', type: 'decimal', precision: 10, scale: 2 })
  valorTotal: number;

  @ManyToOne(() => Oficinas)
  @JoinColumn({ name: 'oficinaId' })
  oficinaId: Oficinas;

  @ManyToOne(() => Veiculos)
  @JoinColumn({ name: 'veiculoId' })
  veiculoId: Veiculos;
}

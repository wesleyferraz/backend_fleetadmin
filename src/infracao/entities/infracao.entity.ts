// infracao.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Veiculo } from 'src/veiculo/entities/veiculo.entity';
import { Motorista } from 'src/motorista/entities/motorista.entity';
@Entity()
export class Infracao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'data', type: 'date' })
  data: Date;

  @Column({ name: 'hora' })
  hora: string;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column({ name: 'local' })
  local: string;

  @Column({ name: 'numeroMulta' })
  numeroMulta: string;

  @Column({ name: 'valorMulta', type: 'decimal', precision: 10, scale: 2 })
  valorMulta: number;

  @Column({ name: 'situacao' })
  situacao: string;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.id)
  veiculo: Veiculo;

  @ManyToOne(() => Motorista, (motorista) => motorista.cpf)
  motorista: Motorista;

  @Column({ name: 'observacoes', nullable: true })
  observacoes: string;
}

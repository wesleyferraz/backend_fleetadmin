import { Veiculos } from 'src/veiculo/entities/veiculo.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Oleo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'marca' })
  marca: string;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column({ name: 'aplicabilidade' })
  aplicabilidade: string;

  @Column({ name: 'volume' })
  volume: string;
}

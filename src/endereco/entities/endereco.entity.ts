// endereco.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'rua' })
  rua: string;

  @Column({ name: 'numero' })
  numero: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'municipio' })
  municipio: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'pais' })
  pais: string;

  @Column({ name: 'cep' })
  cep: string;
}

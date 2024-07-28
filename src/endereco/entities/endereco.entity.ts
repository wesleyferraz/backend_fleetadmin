// endereco.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Enderecos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'logradouro' })
  logradouro: string;

  @Column({ name: 'numero' })
  numero: string;

  @Column({ name: 'bairro' })
  bairro: string;

  @Column({ name: 'municipio' })
  municipio: string;

  @Column({ name: 'estado' })
  estado: string;

  @Column({ name: 'cep' })
  cep: string;
}

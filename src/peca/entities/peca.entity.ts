// peca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pecas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fabricante' })
  fabricante: string;

  @Column({ name: 'descricao' })
  descricao: string;
}

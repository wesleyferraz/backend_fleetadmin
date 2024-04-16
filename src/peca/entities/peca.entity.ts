// peca.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Peca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fabricante' })
  fabricante: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'valor', type: 'decimal', precision: 10, scale: 2 })
  valor: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'table1' }) // Replace 'table1' with the actual table name in your database
export class Table1Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar', length: 100 })
  stringColumn1: string;

  @Column({ type: 'varchar', length: 100 })
  stringColumn2: string;

  @Column({ type: 'varchar', length: 100 })
  stringColumn3: string;
}

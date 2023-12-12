import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from './club.entity';

@Entity('belong_tb', { schema: 'public' })
export class Belong {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'name' })
    name: string;

    @OneToMany(() => Club, (clubTb) => clubTb.belong)
    clubTbs: Club[];
}

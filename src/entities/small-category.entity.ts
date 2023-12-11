import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';

@Entity('small_category_tb', { schema: 'public' })
export class SmallCategory {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'name' })
    name: string;

    @OneToMany(() => Club, (clubTb) => clubTb.smallCategory)
    clubTbs: Club[];
}

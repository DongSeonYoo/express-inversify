import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';

@Entity('big_category_tb', { schema: 'public' })
export class BigCategory {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'name' })
    name: string;

    @OneToMany(() => Club, (clubTb) => clubTb.bigCategory)
    clubTbs: Club[];
}

import { Column, Entity, Index, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('major_tb', { schema: 'public' })
export class Major {
    @Column('smallint', { primary: true, name: 'id' })
    id: number;

    @Column('character varying', { name: 'name', length: 32, nullable: false })
    name: string;

    @OneToMany(() => User, (userTb) => userTb.major)
    userTbs: User[];
}

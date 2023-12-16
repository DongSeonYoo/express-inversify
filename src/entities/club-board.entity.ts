import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { ClubPost } from './club-post.entity';

@Entity('club_board_tb', { schema: 'public' })
export class ClubBoard {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'name', nullable: false, length: 16 })
    name: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @ManyToOne(() => Club, (clubTb) => clubTb.clubBoardTbs, { nullable: false })
    @JoinColumn([{ name: 'club_id', referencedColumnName: 'id' }])
    club: Club;

    @OneToMany(() => ClubPost, (clubPostTb) => clubPostTb.clubBoard)
    clubPostTbs: ClubPost[];
}

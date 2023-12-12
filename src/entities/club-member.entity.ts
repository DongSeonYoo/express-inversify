import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { Position } from './position.entity';
import { User } from './user.entity';

@Entity('club_member_tb', { schema: 'public' })
export class ClubMember {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @ManyToOne(() => Club, (clubTb) => clubTb.clubMemberTbs)
    @JoinColumn([{ name: 'club_id', referencedColumnName: 'id' }])
    club: Club;

    @ManyToOne(() => Position, (positionTb) => positionTb.clubMemberTbs)
    @JoinColumn([{ name: 'position', referencedColumnName: 'id' }])
    position: Position;

    @ManyToOne(() => User, (userTb) => userTb.clubMemberTbs)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}

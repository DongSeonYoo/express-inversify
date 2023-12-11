import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Club } from './club.entity';
import { User } from './User.entity';

@Entity('join_request_tb', { schema: 'public' })
export class JoinRequest {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @ManyToOne(() => Club, (clubTb) => clubTb.joinRequestTbs)
    @JoinColumn([{ name: 'club_id', referencedColumnName: 'id' }])
    club: Club;

    @ManyToOne(() => User, (userTb) => userTb.joinRequestTbs)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ClubPost } from './club-post.entity';
import { User } from './user.entity';
import { ClubReply } from './club-reply.entity';

@Entity('club_comment_tb', { schema: 'public' })
export class ClubComment {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('text', { name: 'content', nullable: false })
    content: string | null;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => ClubPost, (clubPostTb) => clubPostTb.clubCommentTbs, { nullable: false })
    @JoinColumn([{ name: 'club_post_id', referencedColumnName: 'id' }])
    clubPost: ClubPost;

    @ManyToOne(() => User, (userTb) => userTb.clubCommentTbs, { nullable: false })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => ClubReply, (clubReplyTb) => clubReplyTb.clubComment, { nullable: false })
    clubReplyTbs: ClubReply[];
}

import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClubComment } from './club-comment.entity';
import { User } from './user.entity';

@Entity('club_reply_tb', { schema: 'public' })
export class ClubReply {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column('text', { name: 'content' })
    content: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => ClubComment, (clubCommentTb) => clubCommentTb.clubReplyTbs, {
        nullable: false,
    })
    @JoinColumn([{ name: 'club_comment_id', referencedColumnName: 'id' }])
    clubComment: ClubComment;

    @ManyToOne(() => User, (userTb) => userTb.clubReplyTbs, { nullable: false })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}

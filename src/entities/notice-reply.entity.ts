import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NoticeComment } from './notice-comment.entity';
import { User } from './user.entity';

@Entity('notice_reply_tb', { schema: 'public' })
export class NoticeReply {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
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

    @ManyToOne(() => NoticeComment, (noticeCommentTb) => noticeCommentTb.noticeReplyTbs, {
        nullable: false,
    })
    @JoinColumn([{ name: 'comment_id', referencedColumnName: 'id' }])
    comment: NoticeComment;

    @ManyToOne(() => User, (userTb) => userTb.noticeReplyTbs, { nullable: false })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}

import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Notice } from './notice.entity';
import { User } from './user.entity';
import { NoticeReply } from './notice-reply.entity';

@Entity('notice_comment_tb', { schema: 'public' })
export class NoticeComment {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('text', { name: 'content', nullable: false })
    content: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => Notice, (noticeTb) => noticeTb.noticeCommentTbs, { nullable: false })
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
    post: Notice;

    @ManyToOne(() => User, (userTb) => userTb.noticeCommentTbs, { nullable: false })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => NoticeReply, (noticeReplyTb) => noticeReplyTb.comment)
    noticeReplyTbs: NoticeReply[];
}

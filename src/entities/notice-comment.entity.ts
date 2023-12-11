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
import { User } from './User.entity';
import { NoticeReply } from './notice-reply.entity';

@Entity('notice_comment_tb', { schema: 'public' })
export class NoticeComment {
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

    @ManyToOne(() => Notice, (noticeTb) => noticeTb.noticeCommentTbs)
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
    post: Notice;

    @ManyToOne(() => User, (userTb) => userTb.noticeCommentTbs)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => NoticeReply, (noticeReplyTb) => noticeReplyTb.comment)
    noticeReplyTbs: NoticeReply[];
}

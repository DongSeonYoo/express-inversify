import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { NoticeComment } from './notice-comment.entity';
import { NoticeImg } from './notice-img.entity';
import { Club } from './club.entity';
import { User } from './User.entity';

@Entity('notice_tb', { schema: 'public' })
export class Notice {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'title', length: 32 })
    title: string;

    @Column('text', { name: 'content' })
    content: string;

    @Column('boolean', { name: 'is_fixed', nullable: true })
    isFixed: boolean | null;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => NoticeComment, (noticeCommentTb) => noticeCommentTb.post)
    noticeCommentTbs: NoticeComment[];

    @OneToMany(() => NoticeImg, (noticeImgTb) => noticeImgTb.post)
    noticeImgTbs: NoticeImg[];

    @ManyToOne(() => Club, (clubTb) => clubTb.noticeTbs)
    @JoinColumn([{ name: 'club_id', referencedColumnName: 'id' }])
    club: Club;

    @ManyToOne(() => User, (userTb) => userTb.noticeTbs)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}

import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Notice } from './notice.entity';

@Entity('notice_img_tb', { schema: 'public' })
export class NoticeImg {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'post_img' })
    postImg: string;

    @Column('timestamp with time zone', {
        name: 'create_at',
        default: () => 'now()',
    })
    createAt: Date;

    @ManyToOne(() => Notice, (noticeTb) => noticeTb.noticeImgTbs)
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
    post: Notice;
}

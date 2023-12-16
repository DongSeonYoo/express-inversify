import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClubPost } from './club-post.entity';

@Entity('post_img_tb', { schema: 'public' })
export class PostImg {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'post_img' })
    postImg: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @ManyToOne(() => ClubPost, (clubPostTb) => clubPostTb.postImgTbs, { nullable: false })
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
    post: ClubPost;
}

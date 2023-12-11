import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from './Promotion';

@Entity('promotion_img_tb', { schema: 'public' })
export class PromotionImg {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'post_img' })
    postImg: string;

    @Column('timestamp with time zone', {
        name: 'create_at',
        default: () => 'now()',
    })
    createAt: Date;

    @ManyToOne(() => Promotion, (promotionTb) => promotionTb.promotionImgTbs)
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
    post: Promotion;
}

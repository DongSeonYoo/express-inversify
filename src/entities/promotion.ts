import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PromotionComment } from './promotion-comment.entity';
import { PromotionImg } from './promotion-img.entity';
import { Club } from './club.entity';

@Entity('promotion_tb', { schema: 'public' })
export class Promotion {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'title', length: 32 })
    title: string;

    @Column('text', { name: 'content' })
    content: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @OneToMany(
        () => PromotionComment,
        (promotionCommentTb) => promotionCommentTb.post,
    )
    promotionCommentTbs: PromotionComment[];

    @OneToMany(() => PromotionImg, (promotionImgTb) => promotionImgTb.post)
    promotionImgTbs: PromotionImg[];

    @ManyToOne(() => Club, (clubTb) => clubTb.promotionTbs)
    @JoinColumn([{ name: 'club_id', referencedColumnName: 'id' }])
    club: Club;
}

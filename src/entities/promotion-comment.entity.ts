import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Promotion } from './Promotion';
import { User } from './User.entity';
import { PromotionReply } from './promotion-reply.entity';

@Entity('promotion_comment_tb', { schema: 'public' })
export class PromotionComment {
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

    @ManyToOne(
        () => Promotion,
        (promotionTb) => promotionTb.promotionCommentTbs,
    )
    @JoinColumn([{ name: 'post_id', referencedColumnName: 'id' }])
    post: Promotion;

    @ManyToOne(() => User, (userTb) => userTb.promotionCommentTbs)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(
        () => PromotionReply,
        (promotionReplyTb) => promotionReplyTb.comment,
    )
    promotionReplyTbs: PromotionReply[];
}

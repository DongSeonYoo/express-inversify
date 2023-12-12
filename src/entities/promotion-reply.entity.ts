import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PromotionComment } from './promotion-comment.entity';
import { User } from './user.entity';

@Entity('promotion_reply_tb', { schema: 'public' })
export class PromotionReply {
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
        () => PromotionComment,
        (promotionCommentTb) => promotionCommentTb.promotionReplyTbs,
    )
    @JoinColumn([{ name: 'comment_id', referencedColumnName: 'id' }])
    comment: PromotionComment;

    @ManyToOne(() => User, (userTb) => userTb.promotionReplyTbs)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}

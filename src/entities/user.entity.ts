import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ClubComment } from './club-comment.entity';
import { ClubMember } from './club-member.entity';
import { ClubPost } from './club-post.entity';
import { ClubReply } from './club-reply.entity';
import { JoinRequest } from './join-request.entity';
import { NoticeComment } from './notice-comment.entity';
import { NoticeReply } from './notice-reply.entity';
import { Notice } from './notice.entity';
import { PromotionComment } from './promotion-comment.entity';
import { PromotionReply } from './promotion-reply.entity';
import { Major } from './major.entity';

@Entity('user_tb', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'email', length: 256 })
    email: string;

    @Column('character', { name: 'pw', length: 256 })
    pw: string;

    @Column('character varying', { name: 'name', length: 16 })
    name: string;

    @Column('smallint', { name: 'entry_year', nullable: true })
    entryYear: number | null;

    @Column('character', { name: 'personal_color', length: 6 })
    personalColor: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp without time zone', {
        name: 'updated_at',
        default: () => 'now()',
    })
    updatedAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at' })
    deletedAt: Date;

    @OneToMany(() => ClubComment, (clubCommentTb) => clubCommentTb.user)
    clubCommentTbs: ClubComment[];

    @OneToMany(() => ClubMember, (clubMemberTb) => clubMemberTb.user)
    clubMemberTbs: ClubMember[];

    @OneToMany(() => ClubPost, (clubPostTb) => clubPostTb.user)
    clubPostTbs: ClubPost[];

    @OneToMany(() => ClubReply, (clubReplyTb) => clubReplyTb.user)
    clubReplyTbs: ClubReply[];

    @OneToMany(() => JoinRequest, (joinRequestTb) => joinRequestTb.user)
    joinRequestTbs: JoinRequest[];

    @OneToMany(() => NoticeComment, (noticeCommentTb) => noticeCommentTb.user)
    noticeCommentTbs: NoticeComment[];

    @OneToMany(() => NoticeReply, (noticeReplyTb) => noticeReplyTb.user)
    noticeReplyTbs: NoticeReply[];

    @OneToMany(() => Notice, (noticeTb) => noticeTb.user)
    noticeTbs: Notice[];

    @OneToMany(
        () => PromotionComment,
        (promotionCommentTb) => promotionCommentTb.user,
    )
    promotionCommentTbs: PromotionComment[];

    @OneToMany(
        () => PromotionReply,
        (promotionReplyTb) => promotionReplyTb.user,
    )
    promotionReplyTbs: PromotionReply[];

    @ManyToOne(() => Major, (majorTb) => majorTb.userTbs)
    @JoinColumn([{ name: 'major', referencedColumnName: 'id' }])
    major: Major;
}

import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
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

    @Column('character varying', { name: 'email', length: 256, unique: true })
    email: string;

    @Column('character', { name: 'password', length: 60 })
    password: string;

    @Column('character varying', { name: 'name', length: 16 })
    name: string;

    @Column('smallint', { name: 'entry_year', nullable: false })
    entryYear: number;

    @Column('character', { name: 'personal_color', length: 6 })
    personalColor: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
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

    @OneToMany(() => PromotionComment, (promotionCommentTb) => promotionCommentTb.user)
    promotionCommentTbs: PromotionComment[];

    @OneToMany(() => PromotionReply, (promotionReplyTb) => promotionReplyTb.user)
    promotionReplyTbs: PromotionReply[];

    @ManyToOne(() => Major, (majorTb) => majorTb.userTbs, { nullable: false })
    @JoinColumn([{ name: 'major', referencedColumnName: 'id' }])
    major: number;
}

import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ClubBoard } from './club-board.entity';
import { ClubMember } from './club-member.entity';
import { Belong } from './belong.entity';
import { BigCategory } from './big-category.entity';
import { SmallCategory } from './small-category.entity';
import { JoinRequest } from './join-request.entity';
import { Notice } from './notice.entity';
import { Promotion } from './promotion';

@Entity('club_tb', { schema: 'public' })
export class Club {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'name', length: 12 })
    name: string;

    @Column('character varying', { name: 'cover', nullable: false, length: 320 })
    cover: string;

    @Column('boolean', { name: 'is_recruit' })
    isRecruit: boolean;

    @Column('character varying', { name: 'profile_img', length: 256 })
    profileImg: string;

    @Column('character varying', { name: 'banner_img', length: 256 })
    bannerImg: string;

    @Column('character', { name: 'theme_color', length: 6 })
    themeColor: string;

    @Column('timestamp with time zone', {
        name: 'created_at',
        default: () => 'now()',
    })
    createdAt: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => ClubBoard, (clubBoardTb) => clubBoardTb.club)
    clubBoardTbs: ClubBoard[];

    @OneToMany(() => ClubMember, (clubMemberTb) => clubMemberTb.club)
    clubMemberTbs: ClubMember[];

    @ManyToOne(() => Belong, (belongTb) => belongTb.clubTbs, { nullable: false })
    @JoinColumn([{ name: 'belong', referencedColumnName: 'id' }])
    belong: Belong;

    @ManyToOne(() => BigCategory, (bigCategoryTb) => bigCategoryTb.clubTbs, { nullable: false })
    @JoinColumn([{ name: 'big_category', referencedColumnName: 'id' }])
    bigCategory: BigCategory;

    @ManyToOne(() => SmallCategory, (smallCategoryTb) => smallCategoryTb.clubTbs, {
        nullable: false,
    })
    @JoinColumn([{ name: 'small_category', referencedColumnName: 'id' }])
    smallCategory: SmallCategory;

    @OneToMany(() => JoinRequest, (joinRequestTb) => joinRequestTb.club)
    joinRequestTbs: JoinRequest[];

    @OneToMany(() => Notice, (noticeTb) => noticeTb.club)
    noticeTbs: Notice[];

    @OneToMany(() => Promotion, (promotionTb) => promotionTb.club)
    promotionTbs: Promotion[];
}

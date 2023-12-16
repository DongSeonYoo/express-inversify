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
import { ClubBoard } from './club-board.entity';
import { User } from './user.entity';
import { PostImg } from './post-img.entity';

@Entity('club_post_tb', { schema: 'public' })
export class ClubPost {
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

    @OneToMany(() => ClubComment, (clubCommentTb) => clubCommentTb.clubPost)
    clubCommentTbs: ClubComment[];

    @ManyToOne(() => ClubBoard, (clubBoardTb) => clubBoardTb.clubPostTbs, { nullable: false })
    @JoinColumn([{ name: 'club_board_id', referencedColumnName: 'id' }])
    clubBoard: ClubBoard;

    @ManyToOne(() => User, (userTb) => userTb.clubPostTbs, { nullable: false })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => PostImg, (postImgTb) => postImgTb.post)
    postImgTbs: PostImg[];
}

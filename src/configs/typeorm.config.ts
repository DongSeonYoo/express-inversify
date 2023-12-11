import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { ENV } from './env';
import { Belong } from '../entities/belong.entity';
import { Club } from '../entities/club.entity';
import { ClubBoard } from '../entities/club-board.entity';
import { ClubPost } from '../entities/club-post.entity';
import { ClubComment } from '../entities/club-comment.entity';
import { User } from '../entities/User.entity';
import { ClubMember } from '../entities/club-member.entity';
import { Position } from '../entities/position.entity';
import { ClubReply } from '../entities/club-reply.entity';
import { JoinRequest } from '../entities/join-request.entity';
import { NoticeComment } from '../entities/notice-comment.entity';
import { PostImg } from '../entities/post-img.entity';
import { Notice } from '../entities/notice.entity';
import { NoticeImg } from '../entities/notice-img.entity';
import { NoticeReply } from '../entities/notice-reply.entity';
import { Promotion } from '../entities/Promotion';
import { PromotionComment } from '../entities/promotion-comment.entity';
import { PromotionImg } from '../entities/promotion-img.entity';
import { PromotionReply } from '../entities/promotion-reply.entity';
import { Major } from '../entities/major.entity';
import { BigCategory } from '../entities/big-category.entity';
import { SmallCategory } from '../entities/small-category.entity';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: ENV.database.host,
    port: ENV.database.port,
    username: ENV.database.user,
    password: ENV.database.password,
    database: ENV.database.database,
    synchronize: ENV.database.synchronize,
    // entities: [__dirname + '/../entities/*.js'],
    entities: [
        Belong,
        Club,
        ClubBoard,
        ClubPost,
        ClubComment,
        User,
        ClubMember,
        Position,
        ClubReply,
        JoinRequest,
        NoticeComment,
        ClubPost,
        NoticeComment,
        Notice,
        NoticeImg,
        NoticeReply,
        Promotion,
        PromotionComment,
        PromotionImg,
        PromotionReply,
        Major,
        PostImg,
        BigCategory,
        SmallCategory,
    ],
});

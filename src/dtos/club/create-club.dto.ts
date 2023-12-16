import { Belong } from '../../entities/belong.entity';
import { BigCategory } from '../../entities/big-category.entity';
import { Club } from '../../entities/club.entity';
import { SmallCategory } from '../../entities/small-category.entity';
import { clubNameRegex, themeColorRegex } from '../../utils/constants/regex.constant';
import { validate } from '../../utils/validate.util';

export class CreateClubDto {
    belong: number; // 동아리 소속 인덱스 번호
    bigCategory: number; // 동아리 대분류 인덱스 번호
    smallCategory: number; // 동아리 대분류 인덱스 번호
    name: string; // 동아리 이름
    cover: string; // 동아리 소개글
    isRecruit: boolean; //동아리 가입 신청 받을지 여부(bool)
    themeColor: string; // 동아리 색상
    profileImg: string; // 업로드할 이미지 경로
    bannerImg: string; // 동아리 배너

    toEntity(): Club {
        const {
            belong,
            bigCategory,
            smallCategory,
            name,
            cover,
            isRecruit,
            themeColor,
            profileImg,
            bannerImg,
        } = this;

        const club = new Club();
        const belongInstance = new Belong();
        belongInstance.id = belong;

        const smallCategoryInstance = new SmallCategory();
        smallCategoryInstance.id = smallCategory;

        const bigCategoryInstance = new BigCategory();
        bigCategoryInstance.id = bigCategory;

        club.belong = belongInstance;
        club.bigCategory = bigCategoryInstance;
        club.smallCategory = smallCategoryInstance;
        club.name = name;
        club.cover = cover;
        club.isRecruit = isRecruit;
        club.themeColor = themeColor;
        club.profileImg = profileImg;
        club.bannerImg = bannerImg;

        return club;
    }

    static of(body: any) {
        const dto = new CreateClubDto();
        dto.belong = body.belong;
        dto.bigCategory = body.bigCategory;
        dto.smallCategory = body.smallCategory;
        dto.name = body.name;
        dto.cover = body.cover;
        dto.isRecruit = body.isRecruit;
        dto.themeColor = body.themeColor;
        dto.profileImg = body.profileImg;
        dto.bannerImg = body.bannerImg;

        dto.validation();

        return dto;
    }

    private validation() {
        validate(this.belong, 'belong').checkInput().isNumber();
        validate(this.bigCategory, 'bigCategory').checkInput().isNumber();
        validate(this.smallCategory, 'smallCategory').checkInput().isNumber();
        validate(this.name, 'name').checkInput().checkRegex(clubNameRegex);
        validate(this.cover, 'cover').checkInput().checkLength(1, 500);
        validate(this.isRecruit, 'isRecruit').checkInput().isBoolean();
        validate(this.profileImg, 'profileImg').checkInput();
        validate(this.bannerImg, 'bannerImg').checkInput();
        validate(this.themeColor, 'themeColor').checkInput().checkRegex(themeColorRegex);
    }
}

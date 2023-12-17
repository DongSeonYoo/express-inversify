import { ClubService } from '../../../src/services/club.services';
import { ClubRepository } from '../../../src/repositories/club.repository';
import { ClubModule } from '../../../src/configs/inversify/types';
import container from '../../setup';
describe('clubService를 테스트한다', () => {
    let clubService: ClubService;
    let clubRepository: ClubRepository;

    beforeAll(() => {
        // Jest 테스트 전에 InversifyJS 컨테이너를 가져옵니다.

        // 필요한 서비스 및 리포지토리를 가져옵니다.
        clubService = container.get<ClubService>(ClubModule.ClubService);
        clubRepository = container.get<ClubRepository>(ClubModule.ClubRepository);
    });

    it('동아리를 생성한다', async () => {
        // 테스트 코드 작성
    });
});

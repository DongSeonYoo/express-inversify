import 'reflect-metadata';
import { Container } from 'inversify';
import { ClubModule } from '../src/configs/inversify/types';
import { ClubRepository } from '../src/repositories/club.repository';
import { ClubService } from '../src/services/club.services';

const container = new Container();
container.bind<ClubRepository>(ClubModule.ClubRepository).to(ClubRepository);
container.bind<ClubService>(ClubModule.ClubService).to(ClubService);

// Jest 테스트에서 이 컨테이너를 사용할 수 있도록 설정합니다.
export default container;

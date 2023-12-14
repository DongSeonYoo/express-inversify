import { AuthModule } from './types';
import { Container } from 'inversify';
import { AuthService } from '../../services/auth.services';
import { AuthController } from '../../controllers/auth.controller';
import { UserRepository } from '../../repositories/user.repository';
import { DataSource } from 'typeorm';
import { appDataSource } from '../typeorm.config';

const container = new Container();

// Auth 모듈 등록
container.bind<AuthService>(AuthModule.AuthService).to(AuthService);
container.bind<AuthController>(AuthModule.AuthController).to(AuthController);
container.bind<UserRepository>(AuthModule.UserRepository).to(UserRepository);
container.bind<DataSource>(AuthModule.DataSource).toConstantValue(appDataSource);

// User 모듈 등록

export default container;

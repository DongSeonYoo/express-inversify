import { AuthModule, Database, UserModule } from './types';
import { Container } from 'inversify';
import { AuthService } from '../../services/auth.services';
import { AuthController } from '../../controllers/auth.controller';
import { UserRepository } from '../../repositories/user.repository';
import { DataSource } from 'typeorm';
import { appDataSource } from '../typeorm.config';
import { UserService } from '../../services/user.services';
import { UserController } from '../../controllers/user.controller';

const container = new Container();

container.bind<DataSource>(Database.DataSource).toConstantValue(appDataSource);

// Auth 모듈 등록
container.bind<AuthService>(AuthModule.AuthService).to(AuthService);
container.bind<AuthController>(AuthModule.AuthController).to(AuthController);

// User 모듈 등록
container.bind<UserService>(UserModule.UserService).to(UserService);
container.bind<UserController>(UserModule.UserController).to(UserController);
container.bind<UserRepository>(UserModule.UserRepository).to(UserRepository);

export default container;

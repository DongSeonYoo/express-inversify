import TYPES from './types';
import { Container } from 'inversify';
import { AuthService } from '../services/auth.services';
import { AuthController } from '../controllers/auth.controller';
import { UserRepository } from '../repositories/user.repository';
import { DataSource } from 'typeorm';
import { appDataSource } from '../configs/typeorm.config';

const container = new Container();

container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<DataSource>(TYPES.DataSource).toConstantValue(appDataSource);

export default container;

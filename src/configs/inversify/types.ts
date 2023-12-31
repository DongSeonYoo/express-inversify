export const Database = {
    DataSource: Symbol.for('DataSource'),
};

export const AuthModule = {
    AuthController: Symbol.for('AuthController'),
    AuthService: Symbol.for('AuthService'),
};

export const UserModule = {
    UserController: Symbol.for('UserController'),
    UserService: Symbol.for('UserService'),
    UserRepository: Symbol.for('UserRepository'),
};

export const ClubModule = {
    ClubController: Symbol.for('ClubController'),
    ClubService: Symbol.for('ClubService'),
    ClubRepository: Symbol.for('ClubRepository'),
};

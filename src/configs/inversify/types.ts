// const TYPES = {
//     AuthController: Symbol.for('AuthController'),
//     AuthService: Symbol.for('AuthService'),
//     UserRepository: Symbol.for('UserRepository'),
//     DataSource: Symbol.for('DataSource'),
// };

// export default TYPES;

// const TYPES = {
//     AuthModule: {
//         AuthController: Symbol.for('AuthController'),
//         AuthService: Symbol.for('AuthService'),
//         UserRepository: Symbol.for('UserRepository'),
//         DataSource: Symbol.for('DataSource'),
//     },
// };

// export default TYPES;

export const AuthModule = {
    AuthController: Symbol.for('AuthController'),
    AuthService: Symbol.for('AuthService'),
    UserRepository: Symbol.for('UserRepository'),
    DataSource: Symbol.for('DataSource'),
};

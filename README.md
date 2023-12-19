# Express + Inversify 를 이용한 Dependency Injection 구현

## 소개

### Express에서 layered architecture를 적용하여

## 사용된 라이브러리 or 프레임워크

-   Node.js
-   Express.js
-   Typescript
-   Inversify
-   Typeorm + pg

## layerd archutecture를 적용해야하는 이유는 무엇인가?

#### 1. 각 레이어 별 관심사를 분리하기 위해

#### 2. 변경과 확장에 용이하기 때문

#### 3. 테스트에 용이하기 때문

## **관심사의 분리(separation of concerns, SoC)**

-   나누어진 각 계층은 관심사가 존재한다
-   각 계층은 다른 레이어를 신경 쓰지 않고 자신의 관심사만 집중한다
-   계층 별로 결합도를 낮추면(DI를 이용하여) 변경과 확장에 용이해진다

# 각 계층별로 주어진 목적

**Presentation Layer<br>
Business Layer<br>
Data Access Layer<br>**

## 1. Presentation Layer (Controller, DTO)

### Controller

    - Http Request를 받아 리터럴 오브젝트(Json)를 DTO로 변경한다
    - 생성 된 DTO를 Business Layer로 넘겨준다
    - Business Layer에서 반환 된 값을 리터럴 오브젝트(Json)로 변경한다
    - 응답 양식에 맞춰 Response한다

### DTO

    - 계층 간 데이터 전달을 담당한다
    - 자신의 프로퍼티를(데이터를)검증한다

### 2. Business Layer (Services)

    - 비즈니스 로직을 담당한다
    - Data Access Layer에 사용 할 Entity를 생성한다

### 3. Data Access Layer (Repositories)

    - 데이터베이스와의 상호 작용을 담당한다
    - CRUD 작업을 수행하기 위한 메서드를 제공한다
    - 특정 데이터베이스 테이블 또는 컬렉션에 대한 직접적인 쿼리나 연산을 처리한다

## 각 계층은 하위 계층에만 의존한다.

```Typescript
// auth.controller.ts
export class AuthController {
    constructor(
		// 하위 계층인 service에 관한 정보밖에 알지 못한다
        @inject(AuthModule.AuthService)
        private readonly authService: AuthService,
    ) {}
}
```

```Typescript
// auth.service.ts
export class AuthService {
    constructor(
		// 하위 계층인 repository에 관한 정보밖에 알지 못한다
		@inject(UserModule.UserRepository)
		private userRepository: UserRepository){}
}
```

# Dependency Injection (의존성 주입)

    - 각 레이어 간 의존 관계를 외부에서 설정하고 관리
    - 이를 통해 각 레이어는 다른 레이어를 신경쓰지 않아도 된다. (다른 레이어에 의존하지 않는다)

## Inversify를 이용한 의존성 주입

### Inversify

    TS와 JS를 위한 IoC(Inversion of Control)컨테이너 라이브러리
    Symbol을 이용해 고유한 의존성을 만들고 관리

### 의존성 등록

```Typescript
export const AuthModule = {
    AuthController: Symbol.for('AuthController'),
    AuthService: Symbol.for('AuthService'),
};

const container = new Container();

// Auth 모듈 등록
container.bind<AuthService>(AuthModule.AuthService).to(AuthService);
container.bind<AuthController>(AuthModule.AuthController).to(AuthController);
```

### 의존성 주입

```Typescript
// authController
const authController = container.get<AuthController>(AuthModule.AuthController);

// 회원가입
router.post('/signup', authController.signUp.bind(authController));
```

## 해당 프로젝트에서 어려웠던 점

    Typeorm 0.3.X버전부터 Custom Repository 지원을 중단
    Inversify + 변경된 typeorm 예제가 없어 매우 힘들었다

## 해결

Repository 클래스를 container에 의존성으로 등록 해 놓고 외부에서 appDataSource를 주입

DataSource 생성

```Typescript
// /src/config/typeorm.config.ts

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.postgres.host,
    port: env.postgres.port,
    username: env.postgres.user,
    password: env.postgres.password,
    database: env.postgres.database,
    synchronize: env.postgres.synchronize,
    entities: [__dirname + '/../entities/*'],
});
```

container에 DataSource 등록

```Typescript
// types.ts
export const Database = {
    DataSource: Symbol.for('DataSource'),
};
```

```Typescript
// inversify.config.ts
const container = new Container();

container.bind<DataSource>(Database.DataSource).toConstantValue(dataSource);
```

1. UserRepository 클래스를 @injectable()을 이용해 container에 등록
2. 주입받은 DataSource로 repository 연결

```Typescript
// /src/repository/user.repository.ts
@injectable()
export class UserRepository {
    private readonly repository: Repository<User>;

    constructor(
		@inject(Database.DataSource)
		private readonly dataSource: DataSource
		) {
        this.repository = dataSource.getRepository(User);
    }

    async findUserByIdx(userIdx: number) {
        return this.repository.findOne({
            where: {
                id: userIdx,
            },
        });
    }
}
```

## 프로젝트 구조

```shell
src/
├── configs
│   ├── inversify
│   │   ├── inversify.config.ts
│   │   └── types.ts
│   └── ...
├── controllers
│   ├── auth.controller.ts
│   ├── ...
├── dtos
│   ├── auth
│   │   ├── login.dto.ts
│   │   └── ...
├── entities
│   ├── user.entity.ts
│   ├── ...
├── middlewares
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── repositories
│   ├── user.repository.ts
│   └── ...
├── routes
│   ├── auth.routes.ts
│   ├── ...
├── services
│   ├── auth.services.ts
│   ├── ...
└── utils
    ├── ...
```

import env from './configs/env';
import app from './server';

app.listen(env.PORT, () => {
    console.log(env.PORT + '에서 실행');
});

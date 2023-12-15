import { env } from './configs/env';
import app from './server';

app.listen(env.port, () => {
    console.log(env.port + '에서 실행');
});

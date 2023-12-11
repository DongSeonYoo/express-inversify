import { ENV } from './configs/env';
import app from './server';

app.listen(ENV.PORT, () => {
    console.log(ENV.PORT + '에서 실행');
});

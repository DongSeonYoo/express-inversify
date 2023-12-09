import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('get 전역 테스트');
});

export default app;

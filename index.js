import express from 'express';
import res from 'express/lib/response';

const port = 8000;
const app = express();

app.get('/', (req, res) => {
    res.send('Home');
});

app.all('/hello', (req, res, next) => {
    console.log('ALL HELLO');
    next();
});

const cb = (req, res, next) => {
    console.log('CB');
    next();
}

app.route('/user')
    .get('/hello', [cb, cb, cb, (req, res, next) => {//hel?lo, hel+lo, hel*la, he(la)?la
        res.send('Get Hello');
    }])
    .post('/hello', cb, (req, req) => {
        res.send('Post Hello')
    });

app.get(/.*a$/, (req, res) => {
    res.send('Something');
});


app.listen(port, () => {
    console.log(`The server is runnig on http://locakhost:${port}`);
})
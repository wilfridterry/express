import express from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.get('/', (req, res) => {
    throw new Error('Error');
    res.send('Home');
});

app.use((req, res, next) => {
    console.log('Time ', Date.now());
    next();
});

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(403).send(err.message);
});
//#############################################




app.get('/hello', (req, res) => {
    // res.status(201).send({success: true});
    // res.download('/test.pdf', 'testtest.pdf');
    // res.redirect(301, 'https://ex.com');
    // res.append('Warning', 'code');

    // res.set('Content-Type', 'text/plain');

    // res.type('application/json');
    // res.cookie('token', 'TOKKEN', {
    //     domain: '',
    //     path: '/',
    //     secure: true,
    //     expires: 3*60*60*1000
    // });

    // res.clearCookie('token');
    // res.send("HELLO");

    res.end();
});
// app.all('/hello', (req, res, next) => {
//     console.log('ALL HELLO');
//     next();
// });

// const cb = (req, res, next) => {
//     console.log('CB');
//     next();
// }

// app.route('/user')
//     .get('/hello', [cb, cb, cb, (req, res, next) => {//hel?lo, hel+lo, hel*la, he(la)?la
//         res.send('Get Hello');
//     }])
//     .post('/hello', cb, (req, req) => {
//         res.send('Post Hello')
//     });

// app.get(/.*a$/, (req, res) => {
//     res.send('Something');
// });


app.listen(port, () => {
    console.log(`The server is runnig on http://localhost:${port}`);
})
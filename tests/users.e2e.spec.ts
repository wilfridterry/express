import { App } from "../src/app";
import { boot } from "../src/main";
import request from 'supertest';

let application: App;

beforeAll(async () => {
    const { app } = await boot;

    application = app;
});

describe('Users e2e', () => {
    it('registerExistedUser',async () => {
        const res = await request(application.app)
            .post('/users/register')
            .send({ email: 'a@a.ru', password: '1' });

        expect(res.statusCode).toBe(422);
    });

    it('loginWithNotValidData', async () => {
        const res = await request(application.app)
            .post('/users/login')
            .send({ email: 'a@a.com', password: '3' });

        expect(res.statusCode).toBe(401);
    }); 
});

afterAll(() => {
    application.close();
})
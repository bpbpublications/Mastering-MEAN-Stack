import request from 'supertest';
import {auth_app} from '../../app';

it('fails when a email that does not exist is supplied', async ()=> {
    await request(auth_app)
        .post('/api/users/signin')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(400);
});

it('fails when a wrong password is supplied', async ()=> {
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(201);
    await request(auth_app)
        .post('/api/users/signin')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password1'
        })
        .expect(400);
});

it('sends back a cookie when valid credentials are given', async ()=> {
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(201);
    const auth_response = await request(auth_app)
        .post('/api/users/signin')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(200);
    expect (auth_response.get('Set-Cookie')).toBeDefined
});
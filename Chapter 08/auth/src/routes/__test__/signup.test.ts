import request from 'supertest';
import {auth_app} from '../../app';

it('gives a return code of 201 on successful signup', async ()=> {
    return request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(201);
});

it('gives a return code of 400 with an invalid email', async ()=> {
    return request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'testtestcom',
            auth_password: 'password'
        })
        .expect(400);
});

it('gives a return code of 400 with an invalid password', async ()=> {
    return request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'pas'
        })
        .expect(400);
});

it('gives a return code of 400 with missing email and password', async ()=> {
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com'
        })
        .expect(400);
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            password: 'password'
        })
        .expect(400);
});

it('duplicate emails should not be allowed', async ()=> {
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(201);
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(400);
});

it('cookie should be set after successful signup', async ()=> {
    const auth_response = await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(201);
    expect (auth_response.get('Set-Cookie')).toBeDefined();
});

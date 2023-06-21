import request from 'supertest';
import {auth_app} from '../../app';

it('Cookie should be cleared after signing out', async ()=> {
    await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email: 'test@test.com',
            auth_password: 'password'
        })
        .expect(201);
    const auth_response = await request(auth_app)
        .post('/api/users/signout')
        .send({})
        .expect(200);
    expect (auth_response.get('Set-Cookie')).toBeDefined
});

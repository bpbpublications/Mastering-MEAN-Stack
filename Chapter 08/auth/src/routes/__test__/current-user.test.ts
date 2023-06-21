import request from 'supertest';
import {auth_app} from '../../app';

it('Responds with the details of current user', async ()=> {

    
    
    const auth_cookie = await global.auth_signin();
    
    //const authResponse = await request(app)
    //    .post('/api/users/signup')
    //    .send({
    //        email: "test@test.com",
    //        password: "password"
    //    })
    //    .expect(201);

    //const cookie = authResponse.get('Set-Cookie');
    const auth_response = await request(auth_app)
        .get('/api/users/currentuser')
        .set('Cookie',auth_cookie)
        .send()
        .expect(200);
    
//    console.log("ye hai"+response.body.toString());
    expect(auth_response.body.currentUser.auth_email).toEqual('test@test.com');
});

it('Response should be null if user is not authenticated', async ()=> {

    
    
    const auth_response = await request(auth_app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);
   // console.log(response.body);
    expect(auth_response.body.currentUser).toEqual(null);
});

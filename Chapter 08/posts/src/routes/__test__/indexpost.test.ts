import request from 'supertest';
import {post_app} from '../../app';

const createPost = () => {
    return request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title: 'My Title',
            content: 'My Content',
            comments: [            {
                content:'hi',
                createdDt:20230101
            }
]
        });
    
};
it('fetchs a list of posts', async () => {
    await createPost();
    await createPost();
    await createPost();
    const auth_response = await request(post_app)
                        .get('/api/posts')
                        .send()
                        .expect(200);
    expect(auth_response.body.length).toEqual(3);    
});

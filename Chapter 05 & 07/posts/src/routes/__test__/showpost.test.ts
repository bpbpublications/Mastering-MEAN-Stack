import request from 'supertest';
import {post_app} from '../../app';
import mongoose from 'mongoose';


it('if the post is not found, return 404', async () => {
    const id = new mongoose.Types.ObjectId().toHexString;
    const response = await request(post_app)
        .get(`/api/posts/${id}`)
        .send();
        
});

it('returns the post if found', async () => {
    const title = 'My blog';
    const content = 'some content';
    const comments = [
        {
            content: 'Nice Post',
            createdDt: 20230131
        }
    ];
    const response = await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title,content,comments
        })
        .expect(201);
    const postResponse = await request(post_app)
                            .get(`/api/posts/${response.body.id}`)
                            .send()
                            .expect(200);
    expect(postResponse.body.title).toEqual(title);
    expect(postResponse.body.content).toEqual(content);


});
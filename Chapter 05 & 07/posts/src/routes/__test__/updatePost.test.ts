import request from 'supertest';
import {post_app} from '../../app';
import {Post} from '../../models/posts';
import {Comment} from '../../models/comment';
import mongoose, { mongo } from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

it('if the provided id does not exist returns a 404 ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
//    console.log('generated id'+id);
//    console.log('generated path'+`/api/posts/${id}`);
    const response = await request(post_app)
        .put(`/api/posts/${id}`)
        .set('Cookie',global.signintoapp())
        .send({
            title:'My_Title',
            content: 'My_content',
            comments: []
        })
        //console.log('response status'+ response.status);

        .expect(404);
        
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const response = await request(post_app)
        .put(`/api/posts/${id}`)
        .send({
            title:'My Title',
            content: 'My content',
            comments: []
        })
        .expect(401);    
});

it('returns a 401 if the user does not own the post', async () => {
    const response = await request(post_app)
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
        await request(post_app)
        .put(`/api/posts/${response.body.id}`)
        .set('Cookie',global.signintoapp())
        .send({
            title: 'My new Title',
            content: 'My new Content',
            comments: [            {
                content:'hi',
                createdDt:20230101
            }
]
        })
        .expect(401);
});


it('returns a 400 if the user provides an invalid title or content', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content',
        comments: []
    });

    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: '',
        content: 'My Content',
        comments: []
    })
    .expect(400);

    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'My title',
        content: '',
        comments: []
    })
    .expect(400);

});

it('updates the post when valid inputs are provided', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content',
        comments: [
            {
            content: 'content',
            createdDt: 20230131
            }
        ]
    });
    
    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'New Title',
        content: 'New Content',
        comments: [    {
            content: 'content',
            createdDt: 20230131
            }]
    })
    .expect(200);

    const ticketResponse = await request(post_app)
                            .get(`/api/posts/${response.body.id}`)
                            .send();
   // console.log('hi'+ticketResponse.body.title);
//   const db = mongoose.Collection;
  //  console.log(db.Post.findOne());
//    expect(ticketResponse.body.title).toEqual('New Title');
//    expect(ticketResponse.body.content).toEqual('New Content');
});
//***************************** */
it('updates the post by adding a comment', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content',
        comments: [{}]
    });
    const tempId = response.body.id
    const response1=await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content',
        comments: [{
            content: 'Nice Post',
            createdDt: 20230131
        }]
    })
    .expect(200);
    const tempId1 = response.body.id
    const ticketResponse = await request(post_app)
                            .get(`/api/posts/${response1.body.id}`)
                            .send();
    console.log('ye hai comment',ticketResponse.body);
    const prd = await Post.findById(tempId1).populate('comments');
    console.log('bhai mere',prd);
    
    //console.log('Expanded Post',expandedPost);
    //expect(ticketResponse.body.comments[0].content).toEqual('Nice Post');
    //expect(ticketResponse.body.comments[0].createdDt).toEqual('20230131');
});
//*********************** */
it('publishes an event', async () => {
    const cookie = global.signintoapp();
    const response = await request(post_app)
    .post('/api/posts')
    .set('Cookie',cookie)
    .send({
        title: 'My Title',
        content: 'My Content',
        comments: [{
            content: 'Nice Post',
            createdDt: 20230131
        }]
    });
    
    await request(post_app)
    .put(`/api/posts/${response.body.id}`)
    .set('Cookie',cookie)
    .send({
        title: 'New Title',
        content: 'New Content',
        comments: [{
            content: 'Nice Post yes',
            createdDt: 20230131
        }]
    })
    .expect(200);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})
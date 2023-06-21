import request from 'supertest';
import {post_app} from '../../app';
import {Post} from '../../models/posts';
import {Comment} from '../../models/comment';
import {natsWrapper} from '../../nats-wrapper';


it('has a valid route handler listening to /api/posts for post requests', async () => {
    const response = await request(post_app)
                        .post('/api/posts')
                        .send({});
    console.log(response.status);
    expect (response.status).not.toEqual(404);
});

it('can be accessed only if the user is signed in', async () => {
    const response = await request(post_app)
                        .post('/api/posts')
                        .send({})
                        .expect(401);
});

it('if the user is signed in, returns a status other than 401', async () => {
    const auth_response = await request(post_app)
                        .post('/api/posts')
                        .set('Cookie',global.signintoapp())
                        .send({
                            title: 'title',
                            content: 'content',
							comment: [{content:'hi',createdDt:20230101}]
                        });
    console.log('This is haaaa'+auth_response.status);
    expect(auth_response.status).not.toEqual(401);
});

it('if an invalid title is provided it returns an error', async () => {
    await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title: '',
            content: 'some'
        })
        .expect(400);
    
    await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            content: 'some'
        })
        .expect(400);
});

it('if an empty content is provided returns an error', async () => {
    await request(post_app)
    .post('/api/posts')
    .set('Cookie',global.signintoapp())
    .send({
        title: 'my title',
        content: ''
    })
    .expect(400);

await request(post_app)
    .post('/api/posts')
    .set('Cookie',global.signintoapp())
    .send({
        title: 'my title'
    })
    .expect(400);


});

it('when valid inputs are provided, create a post', async () => {
    /*let post = new Post({
        title: 'Mongoose is great',
        content: 'Mongoose is the best',
        userId: 'Me',

    });
    let comment = new Comment({
        content:'Nice Post',
        createdDt:20230202
    });
    post.comments[0].push(comment);*/
    ///let posts = await Post.find({});
    //expect (posts.length).toEqual(0);
    /*await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title: 'my title',
            content: 'my content',
            comment: [
            ]
        })
        .expect(201);*/
        const resp1=await request(post_app)
        .post('/api/posts')
        .set('Cookie',global.signintoapp())
        .send({
            title: 'my title',
            content: 'my content',
            comments: [
                {
                    content:'hi',
                    createdDt:20230101
                }
            ]
        })
      //  .send(post)
        .expect(201);

      /*  const resp2=await request(post_app)
        .put('/api/posts/:id')
        .set('Cookie',global.signintoapp())
        .send({
            title: 'my title',
            content: 'my content',
            comments: [
                {
                    content:'hi',
                    createdDt:20230101
                }
            ]
        })
      //  .send(post)
        .expect(200);*/

    let posts = await Post.find({});
    console.log('Size of posts: ',posts.length);
    expect (posts.length).toEqual(1);
    console.log('Response body',resp1.body);
    console.log('post comments: ',resp1.body.comments[0]);
    let comments = await Comment.find({});
    const prd = await Post.findById(resp1.body.id).populate('comments');
    //prd?.populate('comments');
    console.log('The Post',prd);


});

it('publishes an event',async ()=>{
    await request(post_app)
    .post('/api/posts')
    .set('Cookie',global.signintoapp())
    .send({
        title: 'my title',
        content: 'my content',
        comments: [
            {
                content:'publish',
                createdDt:20233101
            }
        ]

    })
    .expect(201);
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});
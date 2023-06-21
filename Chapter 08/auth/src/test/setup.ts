import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { auth_app } from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            auth_signin(): Promise<string[]>;
        }
    }
};

let auth_mongo: any;
beforeAll(async () => {
    process.env.AUTH_JWT_KEY = 'asdfadfas';

    auth_mongo = new MongoMemoryServer();
    const mongoURI = await auth_mongo.getUri();

    await mongoose.connect(mongoURI);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await auth_mongo.stop();
    await mongoose.connection.close();
});

global.auth_signin = async () => {
    const auth_email = 'test@test.com';
    const auth_password = 'password';

    const auth_response = await request(auth_app)
        .post('/api/users/signup')
        .send({
            auth_email,auth_password
        })
        .expect(201);

    const auth_cookie = auth_response.get('Set-Cookie');

    return auth_cookie;
};
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { post_app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signintoapp(): Promise<string[]>;
        }
    }
};

jest.mock('../nats-wrapper');
let post_mongo: any;
beforeAll(async () => {
    process.env.AUTH_JWT_KEY = 'asdfadfas';

    post_mongo = new MongoMemoryServer();
    const post_mongoURI = await post_mongo.getUri();

    await mongoose.connect(post_mongoURI);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const post_collections = await mongoose.connection.db.collections();

    for (let collection of post_collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await post_mongo.stop();
    await mongoose.connection.close();
});

global.signintoapp = () => {
//Build a JWT payload. {id,email}

const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    auth_email: 'pinakinc@yahoo.com'
};
//Create the JWT
const token = jwt.sign(payload,process.env.AUTH_JWT_KEY!);
//Build a session object {jwt: MY_JWT}
const session = {jwt: token};
//Turn that session into JSON
const sessionJSON = JSON.stringify(session);
//Take JSON and encode it as base-64
const base64 = Buffer.from(sessionJSON).toString('base64');
//Return a string that's a cookie with the encoded data
return [`express:sess=${base64}`];
};
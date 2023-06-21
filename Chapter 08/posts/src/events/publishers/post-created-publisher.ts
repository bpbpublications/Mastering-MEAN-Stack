import {Publisher,Subjects,PostCreatedEvent} from '@pcblog/common';

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
    subject:Subjects.PostCreated=Subjects.PostCreated;

}


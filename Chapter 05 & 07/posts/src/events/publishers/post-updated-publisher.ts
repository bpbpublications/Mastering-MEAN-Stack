import {Publisher,Subjects,PostUpdatedEvent} from '@pcblog/common';

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    subject:Subjects.PostUpdated=Subjects.PostUpdated;

}
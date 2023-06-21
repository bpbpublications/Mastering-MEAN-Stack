import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    private _client?:Stan;
    
    get client(){
        if(!this._client){
            throw new Error('Cannot access NATS client before connecting');
        }
        console.log('inside nats-wrapper'+this._client);
        return this._client;
    }

    connect(clusterId:string,clientId:string,url:string){

        this._client=nats.connect(clusterId, clientId, {url});

        
        return new Promise<void>((resolve,reject)=> {
        //    console.log('inside promise'+this.client.on);
            
        this.client.on('connect',()=>{
            console.log('connected to NATS');
            resolve();
        });
        //console.log('Not connected promise');
        this.client.on('error',(err)=>{
            console.log('some error connecting to NATS');
            reject(err);
        });
    });
    }
}

export const natsWrapper = new NatsWrapper();
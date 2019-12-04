import { Injectable } from '@nestjs/common';

interface IUsers {
    [key: string ]: {
        socketIds: string[],
        channelsIds: string[],
    },
}

@Injectable()
export class AppService {
    private users: IUsers = {};

    addClient(userId: string,socketId: string){
        if (!this.users[userId]) {
            this.users[userId] = {
                socketIds: [socketId],
                channelsIds:[],
            }
        } else {
            this.users[userId].socketIds.push(socketId);
        }
    }

    removeClient(userId: string,socketId: string){
        const userSockets = this.users[userId].socketIds;
        this.users[userId].socketIds = userSockets.filter((socId => socId !== socketId));
    }

    getClient(userId: number){
        return this.users[userId];
    }
}

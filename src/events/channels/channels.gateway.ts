import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {UserMessageResponse} from "../messages/messages.interfaces";
import {AppService} from "../../app.service";

@WebSocketGateway({namespace: '/'})
export class ChannelsGateway {

    @WebSocketServer()
    server: Server;

    constructor(private appService: AppService) {}

    @SubscribeMessage('joinChannels')
    onJoinChannels(socket: Socket, channelsIds: number[]): void {
        socket.join(channelsIds.join().split(','));
        channelsIds.forEach((id: number) => {
            socket.emit('systemMessage', { message: `You joined to ${id}` });
        });
    }

    @SubscribeMessage('joinChannel')
    onJoinChannel(socket: Socket, channelId: number): void {
        socket.join(`${channelId}`);
        socket.emit('systemMessage', {message: `You joined to ${channelId}`});
        socket.broadcast.to(`${channelId}`).emit('systemMessage', {message: `Someone joined!`});
    }

    @SubscribeMessage('leaveChannel')
    onLeaveChannel(socket: Socket, channelId: number): void {
        socket.leave(`${channelId}`, () => {
            socket.emit('systemMessage', {message: `You leave channel ${channelId}!`});
            socket.broadcast.to(`${channelId}`).emit('systemMessage', {message: `Someone leave channel!`});
        });
    }

    @SubscribeMessage('addToChannel')
    onAddToChannel(socket: Socket, data: any): void {

        let client = this.appService.getClient(data.user_id)

        if(!client){
            return;
        }

        for (let socketId of client.socketIds){
            this.server.to(`${socketId}`).emit('addToChannel', data.channel);
        }
    }

    /**
     * Отправляет интеграцию в каналы
     */
    sendIntegration(channel_ids:number [],message:UserMessageResponse){
        for (let id of channel_ids){
            message.channel = id;
            this.server.to(`${id}`).emit('userMessage', message);
            this.server.to(`${id}`).emit('messageNotification', {channel_id:id,from:message.from.id});
        }
    }

}
